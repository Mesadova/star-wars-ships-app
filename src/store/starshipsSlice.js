import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        starshipCollection: [],
        peopleToShow: [],
        pilotsNumbers: [],
        starshipToShow: {},
        status: 'idle',
        error: null,
        loading: true,
        hasMore: true,
    },
    reducers: {
        reset: state => {
            state.starshipCollection = [],
            state.peopleToShow = []
        },
        setStarshipToShow: (state, action) => {
            state.starshipToShow = action.payload
        },
        setPilotsNumbers: (state, action) => {
            state.pilotsNumbers = state.pilotsNumbers.concat(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStarships.pending || fetchPeople.rejected, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchStarships.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.starshipCollection = state.starshipCollection.concat(action.payload)
                state.loading = false;
                state.hasMore = (action.payload.length > 0)
            })
            .addCase(fetchStarships.rejected || fetchPeople.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchPeople.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.peopleToShow = state.peopleToShow.concat(action.payload)
            })
    }
});

export const fetchStarships = createAsyncThunk(
    'starships/fetchStarships',
    async (pageNumber) => {
        const response = await axios.get(`https://swapi.dev/api/starships/?page=${pageNumber}`);
        return response.data.results;
    }
);

export const fetchPeople = createAsyncThunk(
    'starships/fetchPeople',
    async (peopleNumber) => {
        const response = await axios.get(`https://swapi.dev/api/people/${peopleNumber}/`);
        return response.data.name;
    }
);

export default starshipsSlice.reducer;

//--- Actions
export const { reset, setStarshipToShow, setPilotsNumbers } = starshipsSlice.actions

//--- Selectors
export const selectStarshipsCollection = (state) => state.starships.starshipCollection
export const selectHasMore = (state) => state.starships.hasMore
export const selectLoading = (state) => state.starships.loading
export const starshipToShow = (state) => state.starships.starshipToShow
export const peopleToShow = (state) => state.starships.peopleToShow
export const selectPilotsNumbers = (state) => state.starships.pilotsNumbers