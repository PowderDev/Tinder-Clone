import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import KEYS from "../../keys";
import Loading from "../Loading";
import { throttle } from "lodash";
import { getMoreMessages } from "../../store/actions/messenger";
import { addMoreMessages, setPage } from "../../store/slices/messenger";

interface Props {
  sendMessage: (e: any, v: string, fn?: () => void, newLineCb?: () => void) => void;
}

const Chat: React.FC<Props> = ({ sendMessage }) => {
  const [text, setText] = useState("");
  const { currentChat, page, lastPage, loading } = useAppSelector((store) => store.messenger);
  const { user } = useAppSelector((store) => store.user);
  const chatRef = useRef({} as HTMLDivElement);
  const divRef = useRef({} as HTMLDivElement);
  const areaRef = useRef({} as HTMLTextAreaElement);
  const dispatch = useAppDispatch();
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (divRef.current?.scrollIntoView) {
      const percent = (chatRef.current.scrollTop / chatRef.current.scrollHeight) * 100;
      if (firstLoad || percent >= 65) {
        divRef.current.scrollIntoView({ block: "end" });
      }
      setFirstLoad(false);
    }
  }, [currentChat.messages?.length, page, divRef.current.scrollIntoView, firstLoad]);

  useEffect(() => {
    const ref = chatRef.current;
    const fn = throttle((e: any) => {
      if ((e.target.scrollTop / e.target.scrollHeight) * 100 <= 10) {
        if (lastPage != page) {
          getMoreMessages(currentChat.id, page).then((msgs) => {
            if (msgs) dispatch(addMoreMessages(msgs));
            dispatch(setPage(page + 1));
          });
        }
      }
    }, 200);

    if (Object.keys(ref).length) {
      ref.addEventListener("scroll", fn);
      return () => ref.removeEventListener("scroll", fn);
    }
  }, [currentChat, dispatch, lastPage, page]);

  const returnClass = (val: boolean) => {
    if (val) return `rounded-bl-3xl rounded-tl-3xl rounded-br-xl mr-2`;
    else return `rounded-br-3xl rounded-tr-3xl rounded-bl-xl ml-2`;
  };

  const returnMessages = useMemo(() => {
    if (currentChat.id) {
      const msgs = currentChat.messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.sender.photoURL && (msg.sender.id == user.id ? "!mr-0" : "!ml-0")
          } ${
            msg.sender.id == user.id
              ? "justify-start mr-10 flex-row-reverse"
              : "justify-start ml-10"
          }  mb-4`}
        >
          {msg.sender.photoURL && (
            <Image
              src={msg.sender.photoURL}
              className="object-cover rounded-full"
              width={40}
              height={40}
              alt=""
            />
          )}
          <div
            className={`py-3 px-4 whitespace-pre-line break-all bg-gray-400 ${returnClass(
              msg.sender.id == user.id
            )} text-white`}
          >
            {msg.text}
          </div>
        </div>
      ));
      return msgs;
    }
  }, [currentChat.id, currentChat.messages, user.id]);

  return (
    <div className="w-full h-full pb-24 flex flex-col justify-between relative">
      {loading && <Loading width={200} height={200} />}
      {!loading && !currentChat.id && <p className="m-auto">Choose a chat</p>}
      {currentChat.id && (
        <>
          <div ref={chatRef} className="chat">
            {returnMessages}
            <div ref={divRef}></div>
          </div>
          <div className="absolute md:px-10 px-4 w-full bottom-0 flex items-center justify-center">
            <textarea
              ref={areaRef}
              rows={3}
              className={`w-full text-base bg-gray-300 py-2 px-3 ml-2 rounded-xl resize-none ${
                areaRef.current.rows > 6 ? "overflow-hidden" : ""
              }`}
              onChange={(e) => setText(e.target.value)}
              value={text}
              onKeyUp={(e) =>
                sendMessage(
                  e,
                  text,
                  () => {
                    setText("");
                    areaRef.current.rows = 3;
                  },
                  () => {
                    areaRef.current.rows = areaRef.current.value.split("\n").length;
                  }
                )
              }
              placeholder="type your message here..."
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
