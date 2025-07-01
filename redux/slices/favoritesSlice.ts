import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: any[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      const exists = state.items.find(item => item.id === action.payload.id || item.title === action.payload.title);
      if (!exists) state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<any>) => {
      state.items = state.items.filter(
        item => item.id !== action.payload.id && item.title !== action.payload.title
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
