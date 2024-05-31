import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    count: number
}

const count = createSlice({
    name: "count",
    initialState: {
        count: 0,
    },
    reducers: {
        setCountUp: (state, action) => {            
            state.count = ++state.count
        },
        setCountDown: (state, action) => {            
            state.count = --state.count
        },
    },
})

export const { setCountDown,setCountUp } = count.actions;
export default count.reducer