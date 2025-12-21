import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Offer, City } from '../types/offer';

export type DataState = {
  city: City;
  offers: Offer[];
}

const initialState: DataState = {
  city: { name: 'Paris' },
  offers: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
});

export const { changeCity, loadOffers } = dataSlice.actions;
export default dataSlice.reducer;

