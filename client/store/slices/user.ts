import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

interface userState {
  user: User;
  userLoading: boolean;
}

const initialState: userState = {
  user: {} as User,
  userLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearMe: (state) => {
      state.user = {} as User;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

export const { setMe, clearMe, setUserLoading } = userSlice.actions;

export default userSlice.reducer;
