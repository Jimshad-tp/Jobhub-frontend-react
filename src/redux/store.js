import {configureStore}  from '@reduxjs/toolkit'
import {$CombinedState, combineReducers} from 'redux'
import { alertsSlice } from './alertsSlice'

const rootReducer = combineReducers({
    alerts:alertsSlice.reducer,
})

const store = configureStore({
    reducer:rootReducer
})
export default store;