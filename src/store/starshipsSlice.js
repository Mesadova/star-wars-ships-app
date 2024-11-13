import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchStarships = createAsyncThunk('starships/fetchStarships', async () => {
    const response = await axios.get('https://swapi.dev/api/starships');
    return response.data.results;
});

const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        starships: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStarships.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStarships.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.starships = action.payload;
            })
            .addCase(fetchStarships.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default starshipsSlice.reducer;