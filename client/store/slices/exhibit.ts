import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exhibit } from "../../types/exhibit";

interface exhibitState {
  currentExhibit: Exhibit;
  loading: boolean;
}

const initialState: exhibitState = {
  currentExhibit: {} as Exhibit,
  loading: false,
};

export const exhibitSlice = createSlice({
  name: "exhibit",
  initialState,
  reducers: {
    setCurrentExhibit: (state, action: PayloadAction<Exhibit>) => {
      state.currentExhibit = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCurrentExhibit, setLoading } = exhibitSlice.actions;

export default exhibitSlice.reducer;
