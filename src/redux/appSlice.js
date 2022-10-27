import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name:"apps",
    initialState: {
        apps :null
    },
    reducers :{
        setApps : (state , action) => {
            state.apps = action.payload
        }
},
})

export const {setApps} = appSlice.actions;