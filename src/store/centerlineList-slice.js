import { createSlice } from "@reduxjs/toolkit";

const centerlineListSlice = createSlice({
  name: "centerlineList",
  initialState: {
    centerlineDatas: [],
    machineNumbers: [],
    centerlineDifferent: [],
  },
  reducers: {
    getCenterlineDatas(state, action) {
      for (const key in action.payload) {
        state.centerlineDatas.push(action.payload[key]);
      }
    },
    clearCenterlineDatas(state) {
      state.centerlineDatas = [];
    },
    getMachineNumbers(state, action) {
      for (const key in action.payload) {
        if (!state.machineNumbers.includes(action.payload[key].machineNumber))
          state.machineNumbers.push(action.payload[key].machineNumber);
      }
    },
    clearMachineNumbers(state) {
      state.machineNumbers = [];
    },
    getCenterlineDifferent(state, action) {
      const differentList = action.payload;
      for (const key in differentList) {
        for (const data in differentList[key]) {
          state.centerlineDifferent.push(differentList[key][data]);
        }
      }
    },
    clearCenterlineDifferent(state) {
      state.centerlineDifferent = [];
    },
  },
});

export const centerlineListActions = centerlineListSlice.actions;
export default centerlineListSlice;
