import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        headerData: {
            vr_no: "",
            vr_date: "",
            status: "",
            ac_name:"",
            ac_amt: ""
    
        }
    },
    reducers: {
        
        setHeaderData:(state,action) => {
          state.headerData = action.payload
        }
    }
})

export const {setHeaderData} = headerSlice.actions;
export  default headerSlice.reducer;