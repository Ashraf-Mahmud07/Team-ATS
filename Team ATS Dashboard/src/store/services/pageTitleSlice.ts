import { createSlice } from "@reduxjs/toolkit";

const pageTitleSlice = createSlice({
  name: "pageTitle",
  initialState: {
    title: "",
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setPageTitle } = pageTitleSlice.actions;
export default pageTitleSlice.reducer;
