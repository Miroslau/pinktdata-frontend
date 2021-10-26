import { createSlice } from '@reduxjs/toolkit';

export const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: {
    publicAddress: '',
    count: 0,
  },
  reducers: {
    setApartment: (state, { payload }) => {
      state.publicAddress = payload.publicAddress;
      state.count = payload.count;
    },
    clearState: (state) => {
      state.publicAddress = '';
      state.count = 0;
    },
  },
});

export const { setApartment, clearState } = apartmentSlice.actions;

export const apartmentSelector = (state) => state.apartment;
