import { configureStore } from "@reduxjs/toolkit";
import starshipsReducer from './starshipsSlice';


const store = configureStore({
    reducer: {
        starships: starshipsReducer
    }
});

export default store;