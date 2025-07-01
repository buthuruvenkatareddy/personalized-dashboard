import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async (query: string | string[]) => {
  const q = Array.isArray(query) ? query[0] : query;
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${q}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );
  return response.data.articles;
});

interface NewsState {
  articles: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: NewsState = {
  articles: [],
  status: 'idle',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default newsSlice.reducer;
