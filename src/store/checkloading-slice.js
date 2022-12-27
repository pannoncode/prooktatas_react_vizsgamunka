import { createSlice } from "@reduxjs/toolkit";

const checkLoading = createSlice({
  name: "checkLoading",
  initialState: {
    loading: false,
    error: false,
  },
  reducers: {
    isLoading(state) {
      state.loading = true;
    },
    isNotLoading(state) {
      state.loading = false;
    },
    isError(state) {
      state.error = true;
    },
    isNotError(state) {
      state.error = false;
    },
  },
});

export const loadingActions = checkLoading.actions;
export default checkLoading;
