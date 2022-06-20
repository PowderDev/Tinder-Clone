import { configureStore } from "@reduxjs/toolkit";
import exhibitReducer from "./slices/exhibit";
import userReducer from "./slices/user";
import messengerReducer from "./slices/messenger";

export const store = configureStore({
  reducer: {
    user: userReducer,
    exhibit: exhibitReducer,
    messenger: messengerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
