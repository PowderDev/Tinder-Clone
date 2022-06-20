import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import HOC from "../components/HOC";
import Chat from "../components/Messenger/Chat";
import UserList from "../components/Messenger/UserList";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import KEYS from "../keys";
import { getChatById } from "../store/actions/messenger";
import { addNewMessage, setChatLoading, setCurrentChat } from "../store/slices/messenger";
import { Message } from "../types/messenger";

const Messenger = () => {
  const dispatch = useAppDispatch();
  const { currentChat } = useAppSelector((store) => store.messenger);
  const { user } = useAppSelector((store) => store.user);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    const lastChat = JSON.parse(localStorage.getItem("lastChatId") || "{}");

    if (lastChat.chatId && lastChat.userId == user.id && !currentChat.id) {
      dispatch(setChatLoading(true));
      getChatById(lastChat.chatId)
        .then((chat) => {
          if (chat) dispatch(setCurrentChat(chat));
        })
        .finally(() => {
          dispatch(setChatLoading(false));
        });
    }
  }, [currentChat.id, dispatch, user.id]);

  useEffect(() => {
    if (currentChat.id) {
      const socket = io(KEYS.SERVER_URL + "chat");
      socket.on("connect", () => {
        socket.emit("joinChat", { chatId: currentChat.id });

        socket.on("messageAdded", (data: Message) => {
          dispatch(addNewMessage(data));
        });
      });
      socketRef.current = socket;
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [currentChat.id]);

  const sendMessage = (e: any, text: string, cb?: () => void, newLineCb?: () => void) => {
    if (
      e.code === "Enter" &&
      e.shiftKey &&
      e.target.value.split("\n").length >= 3 &&
      e.target.value.split("\n").length <= 5
    ) {
      if (newLineCb) newLineCb();
      return;
    }

    if (e.code === "Backspace") {
      if (e.target.value.split("\n").length === 1) {
        e.target.rows = 3;
      } else {
        e.target.rows = e.target.value.split("\n").length;
      }
    }

    if (socketRef.current && e.code === "Enter" && !e.shiftKey && text.trim().length > 0) {
      socketRef.current.emit("addMessage", {
        senderId: user.id,
        text,
        participantId: currentChat.participant.id,
        chatId: currentChat.id,
      });
      if (cb) cb();
      return;
    }
  };

  return (
    <HOC>
      <Navbar />
      <div className="flex h-[90vh] bg-white">
        <UserList />
        <Chat sendMessage={sendMessage} />
      </div>
    </HOC>
  );
};

export default Messenger;
