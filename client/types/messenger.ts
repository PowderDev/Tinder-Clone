import { User } from "./user";

export interface ChatListItem {
  id: number;
  participant: User;
  lastMessage: Message;
}
export interface Chat {
  id: number;
  participant: User;
  messages: Message[];
  participantIds: number[];
  lastPage: number;
}

export interface Message {
  id: number;
  text: string;
  chatId: number;
  sender: User;
}
