import { createSlice } from "@reduxjs/toolkit";

const alarmSlice = createSlice({
    name: "alarm",
    initialState: {
        alarm: [],
    },
    reducers: {
        setAlarm(state, action) {
            state.alarm = action.payload;
        },
    },
});
export const { setAlarm } = alarmSlice.actions;
export default alarmSlice.reducer;
