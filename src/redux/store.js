import {configureStore}  from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import { alertsSlice } from './alertsSlice'
import { appSlice } from './appSlice'
import { slotSlice } from './slotSlice'
import { userSlice } from './userSlice'


const rootReducer = combineReducers({
    alerts:alertsSlice.reducer,
    user:userSlice.reducer,
    slot:slotSlice.reducer,
    app:appSlice.reducer
    
})

const store = configureStore({
    reducer:rootReducer
})
export default store;