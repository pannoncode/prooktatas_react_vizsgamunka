import { createSlice } from "@reduxjs/toolkit";

const machineNumberSlice = createSlice({
  name: "machineNumbers",
  initialState: {
    machineNumbers: [],
    allMachineNumbers: [],
  },
  reducers: {
    getMachineNumbers(state, action) {
      for (const key in action.payload) {
        state.machineNumbers.push(action.payload[key]);
      }
    },
    clearMachineNumbers(state) {
      state.machineNumbers = [];
    },
    getAllMachineNumbers(state, action) {
      for (const key in action.payload) {
        state.allMachineNumbers.push(action.payload[key].name);
      }
    },
    clearAllMachineNumbers(state) {
      state.allMachineNumbers = [];
    },
  },
});

export const machineNumbersActions = machineNumberSlice.actions;
export default machineNumberSlice;
