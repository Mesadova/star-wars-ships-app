import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchStarships = createAsyncThunk(
    'starships/fetchStarships',
    async (pageNumber) => {
        const response = await axios.get(`https://swapi.dev/api/starships/?page=${pageNumber}`);
        return response.data.results;
    }
);

export const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        starships: [],
        status: 'idle',
        error: null,
        loading: true,
        hasMore: true,
    },
    reducers: {
        reset: state => {
            state.starships = []
        },
        setPageNumber: (state, action) => {
            state.value += action.payload
        },
    },
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

export const { reset } = starshipsSlice.actions

export const selectStarships = (state) => state.starships.starships
export const selectHasMore = (state) => state.starships.hasMore
export const selectLoading = (state) => state.starships.loading