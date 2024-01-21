import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        rows: [{sr:1, code: '', name: '', qty:"",rate:"", amount:""}]
    },
    reducers: {
        addRow: (state) => {
          state.rows.push({
            sr:state.rows.length +1, code: '', name: '', qty:"",rate:"", amount:""
          })
        },
        setRows:(state,action) => {
          state.rows = action.payload
        }
    }
})

export const {addRow, setRows} = appSlice.actions;
export  default appSlice.reducer;