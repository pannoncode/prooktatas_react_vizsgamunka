import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
  name: "headerTitle",
  initialState: {
    title: "",
    machineNumberTitle: "",
    centerlineTypeTitle: "",
  },
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    clearTitle(state) {
      state.title = "";
    },
    setMachineNumberTitle(state, action) {
      state.machineNumberTitle = action.payload;
    },
    clearMachineNumberTitle(state) {
      state.machineNumberTitle = "";
    },
    setCenterlineTypeTitle(state, action) {
      state.centerlineTypeTitle = action.payload;
    },
    clearCenterlineTypeTitle(state) {
      state.centerlineTypeTitle = "";
    },
  },
});

export const titleActions = titleSlice.actions;
export default titleSlice;
