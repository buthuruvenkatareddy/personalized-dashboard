import { configureStore } from '@reduxjs/toolkit';

import preferencesReducer from './slices/preferencesSlice';
import newsReducer from './slices/newsSlice';
import moviesReducer from './slices/moviesSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    news: newsReducer,
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
