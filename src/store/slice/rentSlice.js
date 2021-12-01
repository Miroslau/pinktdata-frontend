import { createSlice } from '@reduxjs/toolkit';
import { addNewRoom } from '../actions/rentAction';

const initialState = {
  isFetching: true,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  roomsForRent: [],
  name: '',
  city: '',
  publicAddress: '',
  currency: '',
  amount: 0,
  bedrooms: 0,
};

export const rentSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.roomsForRent = [];
      state.name = '';
      state.city = '';
      state.publicAddress = '';
      state.currency = '';
      state.amount = 0;
      state.bedrooms = 0;
    },
  },
  extraReducers: {
    [addNewRoom.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.roomsForRent = payload.roomsForRent;
      state.name = payload.name;
      state.city = payload.city;
      state.publicAddress = payload.publicAddress;
      state.currency = payload.currency;
      state.amount = payload.amount;
      state.bedrooms = payload.bedrooms;
    },
    [addNewRoom.pending]: (state) => {
      state.isFetching = true;
    },
    [addNewRoom.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = payload;
    },
  },
});

export const { clearState } = rentSlice.actions;
export const rentReducer = rentSlice.reducer;

export const rentSelector = (state) => state.rent;
