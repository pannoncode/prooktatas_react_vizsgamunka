import { createSlice } from "@reduxjs/toolkit";

const errorFeedbackSlice = createSlice({
  name: "errorFeedback",
  initialState: {
    error: false,
    errorPart: "",
    content: "",
  },
  reducers: {
    isError(state, action) {
      state.error = true;
      state.errorPart = action.payload;
      state.content = action.payload;
    },
    isNotError(state) {
      state.error = false;
      state.errorPart = "";
      state.content = "";
    },
  },
});

export const errorActions = errorFeedbackSlice.actions;
export default errorFeedbackSlice;
