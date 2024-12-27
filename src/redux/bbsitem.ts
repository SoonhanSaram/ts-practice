import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BbsItemState {
  bbsItemList: any[];
  bbsItemSet: {};
}

const initialState: BbsItemState = {
  bbsItemList: [],
  bbsItemSet: {},
};

const bbsItemSlice = createSlice({
  name: "bbsItem",
  initialState,
  reducers: {
    setBbsItem: (state, action: PayloadAction<any[]>) => {
      if (action.payload && Array.isArray(action.payload)) {
        console.log("action.payload", action.payload);
        state.bbsItemList = action.payload;
        console.log("state.bbsItemList", state.bbsItemList);
      } else {
        console.error("Invalid payload for setBbsItem:", action.payload);
      }
    },
  },
});

export const setBbsItem = bbsItemSlice.actions;
export default bbsItemSlice.reducer;
