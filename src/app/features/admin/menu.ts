import { createSlice } from "@reduxjs/toolkit";

interface Menu {
    menu_id : string;
    menu_name : string;
    menu_order : number;
    upper_menu : string;
    menu_url : string;    
    menu_authorizaion : string;
}


const menuSlice = createSlice({
    name: "menu",
    initialState: {
        menu: [],
    },
    reducers: {
        setMenu: (state, action) => {
            state.menu = action.payload;
        },
    },
});

export const {setMenu} = menuSlice.actions;
export default menuSlice.reducer;