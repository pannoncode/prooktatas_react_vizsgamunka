import { createSlice } from "@reduxjs/toolkit";

const centerlineTypes = createSlice({
  name: "centerlineTypes",
  initialState: {
    clTypes: [],
    clAllTypes: [],
  },
  reducers: {
    getClTypes(state, action) {
      for (const key in action.payload) {
        state.clTypes.push(action.payload[key].name);
      }
    },
    clearClTypes(state) {
      state.clTypes = [];
    },
    getAllClTypes(state, action) {
      for (const key in action.payload) {
        state.clAllTypes.push(action.payload[key]);
      }
    },
    clearAllClTypes(state) {
      state.clAllTypes = [];
    },
  },
});

export const centerlineTypesActions = centerlineTypes.actions;
export default centerlineTypes;
