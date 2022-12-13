import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
  name: "headerTitle",
  initialState: {
    title: "",
  },
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const titleActions = titleSlice.actions;
export default titleSlice;
