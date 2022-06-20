import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { getChatById, getMyChats } from "../../store/actions/messenger";
import { setChatList, setCurrentChat } from "../../store/slices/messenger";
import Loading from "../Loading";
import { ChatListItem } from "../../types/messenger";
import { BsList, BsX } from "react-icons/bs";

//@ts-expect-error
const List: React.FC<{ chatList: ChatListItem[]; setOpen: (v: boolean) => void }> = ({
  chatList,
  setOpen,
}) => {
  const { currentChat } = useAppSelector((store) => store.messenger);
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const getChat = async (id: number) => {
    if (currentChat.id != id) {
      const chat = await getChatById(id);
      if (chat) {
        dispatch(setCurrentChat(chat));
        localStorage.setItem("lastChatId", JSON.stringify({ userId: user.id, chatId: chat.id }));
      }
    }
    setOpen(false);
  };

  return chatList.map((chat) => (
    <div
      key={chat.id}
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer"
      onClick={() => getChat(chat.id)}
    >
      <div className="w-1/4">
        <Image
          width={48}
          height={48}
          src={chat.participant.photoURL}
          className="rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">
          {chat.participant.firstName} {chat.participant.lastName}
        </div>
        {chat.lastMessage.text && (
          <span className="text-gray-500">
            {(chat.lastMessage.sender.id === user.id ? "Me" : chat.lastMessage.sender.firstName) +
              ": " +
              chat.lastMessage.text.slice(0, 22) +
              (chat.lastMessage.text.length > 22 ? "..." : "")}
          </span>
        )}
      </div>
    </div>
  ));
};

const UserList = () => {
  const { chatList } = useAppSelector((store) => store.messenger);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMyChats()
      .then((chats) => {
        if (chats) dispatch(setChatList(chats));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <BsList
        className="absolute left-5 top-20 text-4xl z-10 md:hidden"
        onClick={() => setOpen(true)}
      />
      <div
        className={`flex flex-col md:w-2/6 w-full border-r-2 overflow-y-auto md:static absolute bg-white h-full z-10  ${
          open ? "left-0" : "-left-full"
        }`}
      >
        <div className="border-b-2 py-4 px-2 flex items-center justify-between">
          <input
            type="text"
            placeholder="Joe Rifkin"
            className="py-3 px-2 border-2 border-gray-200 outline-none rounded-2xl w-full"
          />
          <BsX className="text-6xl md:hidden" onClick={() => setOpen(false)} />
        </div>
        {loading && <Loading width={200} height={200} />}
        {chatList.length > 0 && (
          <>
            <List setOpen={setOpen} chatList={chatList} />
          </>
        )}
      </div>
    </>
  );
};

export default UserList;
