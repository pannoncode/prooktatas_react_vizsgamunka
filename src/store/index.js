import { configureStore } from "@reduxjs/toolkit";
import centerlineListSlice from "./centerlineList-slice";
import checkLoading from "./checkloading-slice";
import machineNumberSlice from "./machineNumbers-slice";
import centerlineTypes from "./centerlineTypes-slice";
import errorFeedbackSlice from "./errorFeedback-slice";

const store = configureStore({
  reducer: {
    centerlineList: centerlineListSlice.reducer,
    checkLoading: checkLoading.reducer,
    machineNumbers: machineNumberSlice.reducer,
    centerlineTypes: centerlineTypes.reducer,
    errorFeedback: errorFeedbackSlice.reducer,
  },
});

export default store;
