import { createSlice } from '@reduxjs/toolkit';

export const majorCitySlice = createSlice({
  name: 'majorCity',
  initialState: {
    city: '',
    publicAddress: '',
    imageUrl: '',
    count: 0,
  },
  reducers: {
    setMajorCity: (state, { payload }) => {
      state.city = payload.city;
      state.publicAddress = payload.publicAddress;
      state.imageUrl = payload.imageUrl;
      state.count = payload.count;
    },
    clearState: (state) => {
      state.city = '';
      state.publicAddress = '';
      state.imageUrl = '';
      state.count = 0;
    },
  },
});

export const { setMajorCity, clearState } = majorCitySlice.actions;

export const majorCitySelector = (state) => state.majorCity;
