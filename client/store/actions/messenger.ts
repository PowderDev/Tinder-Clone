import { Chat, ChatListItem, Message } from "./../../types/messenger";
import $api from "../../helpers/http";

export const getMyChats = async () => {
  try {
    const { data } = await $api.get<ChatListItem[]>("/chat/my");
    return data;
  } catch (err: any) {
    console.log(err);
    console.log(err?.response?.data?.message);
  }
};

export const createChat = async (id: number) => {
  try {
    const { data } = await $api.post<Chat>("/chat/create", { participantId: id });
    return data;
  } catch (err: any) {
    console.log(err);
    console.log(err?.response?.data?.message);
  }
};

export const getChatById = async (id: number) => {
  try {
    const { data } = await $api.get<Chat>(`/chat/${id}`);
    return data;
  } catch (err: any) {
    console.log(err);
    console.log(err?.response?.data?.message);
  }
};

export const getMoreMessages = async (id: number, page: number) => {
  try {
    const { data } = await $api.get<Message[]>(`chat/message/more?chatId=${id}&skip=${page}`);
    return data;
  } catch (err: any) {
    console.log(err);
    console.log(err?.response?.data?.message);
  }
};
