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

const store = configureStore({
    reducer: {
        starships: starshipsReducer
    }
});

export default store;