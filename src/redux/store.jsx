import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import headerSlice from "./headerSlice";

const store = configureStore({
    reducer:{
        app: appSlice,
        header: headerSlice
        
    }
});

export default store;