import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        starshipCollection: [],
        starshipToShow: {},
        status: 'idle',
        error: null,
        loading: true,
        hasMore: true,
    },
    reducers: {
        reset: state => {
            state.starshipCollection = []
        },
        setStarshipToShow: (state, action) => {
            state.starshipToShow = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStarships.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchStarships.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.starshipCollection = state.starshipCollection.concat(action.payload)
                state.loading = false;
                state.hasMore = (action.payload.length > 0)
            })
            .addCase(fetchStarships.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const fetchStarships = createAsyncThunk(
    'starships/fetchStarships',
    async (pageNumber) => {
        const response = await axios.get(`https://swapi.dev/api/starships/?page=${pageNumber}`);
        return response.data.results;
    }
);

export default starshipsSlice.reducer;

//--- Actions
export const { reset, setStarshipToShow } = starshipsSlice.actions

//--- Selectors
export const selectStarshipsCollection = (state) => state.starships.starshipCollection
export const selectHasMore = (state) => state.starships.hasMore
export const selectLoading = (state) => state.starships.loading
export const starshipToShow = (state) => state.starships.starshipToShow