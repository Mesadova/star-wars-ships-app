import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        starshipCollection: [],
        pilotsNames: [],
        pilotsNumbers: [],
        filmsNames: [],
        filmsNumbers: [],
        starshipToShow: {},
        status: 'idle',
        error: null,
        loading: true,
        hasMore: true,
    },
    reducers: {
        reset: state => {
            state.starshipCollection = [],
            state.pilotsNames = [],
            state.pilotsNumbers = [],
            state.filmsNames = [],
            state.filmsNumbers = [],
            state.starshipToShow = {}
        },
        setStarshipToShow: (state, action) => {
            state.starshipToShow = action.payload
        },
        setPilotsNumbers: (state, action) => {
            state.pilotsNumbers = state.pilotsNumbers.concat(action.payload)
        },
        setFilmsNumbers: (state, action) => {
            state.filmsNumbers = state.filmsNumbers.concat(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStarships.pending || fetchPilotsNames.pending || fetchFilmsNames.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchStarships.rejected || fetchPilotsNames.rejected || fetchFilmsNames.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchStarships.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.starshipCollection = state.starshipCollection.concat(action.payload)
                state.loading = false;
                state.hasMore = (action.payload.length > 0)
            })
            .addCase(fetchPilotsNames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pilotsNames = state.pilotsNames.concat(action.payload)
                state.loading = false;
            })
            .addCase(fetchFilmsNames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.filmsNames = state.filmsNames.concat(action.payload)
                state.loading = false;
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

export const fetchPilotsNames = createAsyncThunk(
    'starships/fetchPeople',
    async (peopleNumber) => {
        const response = await axios.get(`https://swapi.dev/api/people/${peopleNumber}/`);
        return response.data.name.toUpperCase();
    }
);

export const fetchFilmsNames = createAsyncThunk(
    'starships/fetchFilms',
    async (filmNumber) => {
        const response = await axios.get(`https://swapi.dev/api/films/${filmNumber}/`);
        return {title: response.data.title, episode_id: response.data.episode_id };
    }
);

export default starshipsSlice.reducer;

//--- Actions
export const { reset, setStarshipToShow, setPilotsNumbers, setFilmsNumbers } = starshipsSlice.actions

//--- Selectors
export const selectStarshipsCollection = (state) => state.starships.starshipCollection
export const selectHasMore = (state) => state.starships.hasMore
export const selectLoading = (state) => state.starships.loading
export const selectStarshipToShow = (state) => state.starships.starshipToShow
export const selectPilotsNames = (state) => state.starships.pilotsNames
export const selectPilotsNumbers = (state) => state.starships.pilotsNumbers
export const selectFilmsNames = (state) => state.starships.filmsNames
export const selectFilmsNumbers = (state) => state.starships.filmsNumbers