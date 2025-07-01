import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMoviesFromOMDB } from '../../services/omdbAPI';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query: string = 'batman') => {
    const results = await fetchMoviesFromOMDB(query);
    return results;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default moviesSlice.reducer;
