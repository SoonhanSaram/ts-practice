import { createSlice } from "@reduxjs/toolkit";
import { set } from "firebase/database";

const bbsItemSlice = createSlice({
  name: "bbsItem",
  initialState: {
    bbsItemList: [],
    bbsItemSet: {},
  },
  reducers: {
    setBbsItem: (state, action) => {
      state.bbsItemList = action.payload;
    },
  },
});

export const { setBbsItem } = bbsItemSlice.actions;
export default bbsItemSlice.reducer;
