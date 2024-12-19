import { configureStore } from "@reduxjs/toolkit";
import bbsItemReducer from "./bbsitem";
const store = configureStore({
  reducer: {
    bbsItem: bbsItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
