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
    searchParams: {
      count: 0,
      priceRange: [],
      bedrooms: 0,
      isMax: true,
    },
  },
  reducers: {
    setApartment: (state, { payload }) => {
      // eslint-disable-next-line max-len
      state.publicAddress = payload.publicAddress ? payload.publicAddress : state.publicAddress;
      // eslint-disable-next-line max-len
      state.searchParams.currentPage = payload.currentPage ? payload.currentPage : state.searchParams.currentPage;
      state.searchParams.count = payload.count ? payload.count : state.searchParams.count;
      // eslint-disable-next-line max-len
      state.searchParams.priceRange = payload.priceRange ? [...payload.priceRange] : [...state.searchParams.priceRange];
      // eslint-disable-next-line max-len
      state.searchParams.bedrooms = payload.bedrooms ? payload.bedrooms : state.searchParams.bedrooms;
      state.searchParams.isMax = payload.isMax ? payload.isMax : state.searchParams.isMax;
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
      state.searchParams = {
        count: 0,
        priceRange: [],
        bedrooms: 0,
        isMax: true,
      };
    },
  },
  extraReducers: {
    [searchApartments.fulfilled]: (state, { payload }) => {
      state.apartments = payload.isFilter ? payload.data : [...state.apartments, ...payload];
      state.currentPage = payload.isFilter ? 1 : state.currentPage += 1;
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
  setApartment, clearState, setParams,
} = apartmentSlice.actions;

export const apartmentSelector = (state) => state.apartment;
