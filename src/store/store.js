import { combineReducers, configureStore } from "@reduxjs/toolkit";
import starshipsReducer from './starshipsSlice';

const rootReducer = combineReducers({
    starships: starshipsReducer
})

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}
