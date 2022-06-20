import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { excludeSenderImage } from "../../helpers/DOM";
import { ChatListItem, Chat, Message } from "../../types/messenger";

interface chatState {
  chatList: ChatListItem[];
  currentChat: Chat;
  loading: boolean;
  page: number;
  lastPage: number;
}

const initialState: chatState = {
  currentChat: {} as Chat,
  chatList: [] as ChatListItem[],
  loading: false,
  page: 1,
  lastPage: 0,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<ChatListItem[]>) => {
      state.chatList = action.payload;
    },
    setCurrentChat: (state, action: PayloadAction<Chat>) => {
      state.currentChat = action.payload;
      state.currentChat.messages = excludeSenderImage(action.payload.messages);
      state.lastPage = action.payload.lastPage;
    },
    setChatLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<Message>) => {
      const chat = state.chatList.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.lastMessage = action.payload;
      }
      state.currentChat.messages = excludeSenderImage([
        ...state.currentChat.messages,
        action.payload,
      ]);
    },
    addMoreMessages: (state, action: PayloadAction<Message[]>) => {
      if (state.currentChat.messages[0].id != action.payload[0].id) {
        state.currentChat.messages = excludeSenderImage([
          ...action.payload,
          ...state.currentChat.messages,
        ]);
      }
    },
  },
});

export const {
  setChatList,
  setCurrentChat,
  setChatLoading,
  addNewMessage,
  addMoreMessages,
  setPage,
} = chatSlice.actions;

export default chatSlice.reducer;
