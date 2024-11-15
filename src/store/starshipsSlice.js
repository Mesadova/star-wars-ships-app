import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchStarships = createAsyncThunk(
    'starships/fetchStarships',
    async (arg, { getState }) => {
        const state = getState();
        const response = await axios.get(`https://swapi.dev/api/starships/?page=${state.starships.page}`);
        return response.data.results;
    }
);

const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        starships: [],
        status: 'idle',
        page: 1,
        error: null,
        loading: true,
        hasMore: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStarships.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchStarships.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.starships = state.starships.concat(action.payload)
                state.loading = false;
                state.hasMore = (action.payload.length > 0)
            })
            .addCase(fetchStarships.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default starshipsSlice.reducer;