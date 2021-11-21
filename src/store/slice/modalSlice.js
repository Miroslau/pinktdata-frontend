import { createSlice } from '@reduxjs/toolkit';
import { addNewRoom } from '../actions/modalAction';

const initialState = {
  isFetching: true,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  roomsForRent: [],
  name: '',
  city: '',
  publicAddress: '',
  amount: 0,
  currency: '',
  bedrooms: 0,
};

const modalSlice = createSlice({
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
      state.amount = 0;
      state.currency = '';
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
      state.amount = payload.amount;
      state.currency = payload.currency;
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

export const { clearState } = modalSlice.actions;

export const modalSelector = (state) => state.modal;
