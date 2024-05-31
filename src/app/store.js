import { configureStore } from "@reduxjs/toolkit";
import countReducer from "../app/features/admin/count";

export const store = configureStore({
    reducer: {
        count: countReducer,
    },
});