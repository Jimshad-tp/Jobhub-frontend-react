import { createSlice } from "@reduxjs/toolkit";

export const slotSlice = createSlice({
    name:"slot",
    initialState: {
        slot :null
    },
    reducers :{
        setSlot : (state , action) => {
            state.slot = action.payload
        }
},
})

export const {setSlot} = slotSlice.actions;