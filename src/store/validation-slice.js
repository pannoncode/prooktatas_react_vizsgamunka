import { createSlice } from "@reduxjs/toolkit";

const validationSlice = createSlice({
  name: "validationSlice",
  initialState: {
    validation: true,
    sendCheck: false,
    postData: {},
  },
  reducers: {
    validationOk(state) {
      state.validation = true;
    },
    validationNok(state) {
      state.validation = false;
    },
    getPostData(state, action) {
      state.postData = action.payload;
    },
    clearPostData(state) {
      state.postData = {};
    },
    sendCheckTrueHandler(state) {
      state.sendCheck = true;
    },
    sendCheckFalseHandler(state) {
      state.sendCheck = false;
    },
  },
});

export const validationAction = validationSlice.actions;
export default validationSlice;
