import { createSlice } from '@reduxjs/toolkit';
import { searchApartments } from '../actions/apartmentAction';

export const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: {
    isFetching: true,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    apartments: [],
    publicAddress: '',
    currentPage: 0,
    count: 0,
    searchParams: {
      priceRange: [],
      bedrooms: 0,
      isMax: true,
    },
  },
  reducers: {
    setPublicAddress: (state, { payload }) => {
      state.publicAddress = payload.publicAddress;
    },
    setParams: (state, { payload }) => {
      state.searchParams.isMax = payload.isMax;
      state.searchParams.priceRange = payload.priceRange;
      state.searchParams.bedrooms = payload.bedrooms;
    },
    clearState: (state) => {
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.apartments = [];
      state.publicAddress = '';
      state.currentPage = 0;
      state.count = 0;
      state.searchParams = {
        priceRange: [],
        bedrooms: 0,
        isMax: true,
      };
    },
  },
  extraReducers: {
    [searchApartments.fulfilled]: (state, { payload }) => {
      state.apartments = payload.isFilter
        ? payload.apartments
        : [...state.apartments, ...payload.apartments];
      state.currentPage = payload.isFilter ? 1 : state.currentPage += 1;
      state.count = payload.count;
      state.isSuccess = true;
      state.isFetching = false;
    },
    [searchApartments.pending]: (state) => {
      state.isFetching = true;
    },
    [searchApartments.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = payload.message;
    },
  },
});

export const {
  setPublicAddress, clearState, setParams,
} = apartmentSlice.actions;

export const apartmentSelector = (state) => state.apartment;
