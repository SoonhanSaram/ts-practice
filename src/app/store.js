import { configureStore } from "@reduxjs/toolkit";
import countReducer from "../app/features/admin/count";
import menuReducer from "../app/features/admin/menu";

export const store = configureStore({
    reducer: {
        count: countReducer,
        menu : menuReducer,
    },
});