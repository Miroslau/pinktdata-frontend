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
    clusters: [],
    isFetchAll: true,
    publicAddress: '',
    currentPage: 0,
    count: 0,
    bounds: null,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    searchParams: {
      priceRange: [],
      bedrooms: 0,
      isMax: true,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  },
  reducers: {
    setPublicAddress: (state, { payload }) => {
      state.publicAddress = payload.publicAddress;
    },
    setParams: (state, { payload }) => ({
      ...state,
      searchParams: {
        ...state.searchParams,
        ...payload,
      },
    }),
    setBounds: (state, { payload }) => ({
      ...state,
      bounds: payload,
    }),
    setDate: (state, { payload }) => {
      state.startDate = payload.startDate;
      state.endDate = payload.endDate;
    },
    setDateParams: (state, { payload }) => {
      state.searchParams.startDate = payload.startDate;
      state.searchParams.endDate = payload.endDate;
    },
    clearState: (state) => {
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.isFetchAll = true;
      state.apartments = [];
      state.clusters = [];
      state.publicAddress = '';
      state.currentPage = 0;
      state.count = 0;
      state.bounds = null;
      state.searchParams = {
        priceRange: [],
        bedrooms: 0,
        isMax: true,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      };
    },
    clearStateWithoutDate: (state) => {
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.isFetchAll = true;
      state.apartments = [];
      state.clusters = [];
      state.publicAddress = '';
      state.currentPage = 0;
      state.count = 0;
      state.bounds = null;
      state.searchParams = {
        ...state.searchParams,
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
      state.clusters = payload.clusters;
      state.isFetchAll = payload.isFetchAll;
      state.isSuccess = true;
      state.isFetching = false;
    },
    [searchApartments.pending]: (state) => {
      state.isFetching = true;
    },
    [searchApartments.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  setPublicAddress, clearState, setParams, setBounds, setDate, setDateParams, clearStateWithoutDate,
} = apartmentSlice.actions;

export const apartmentSelector = (state) => state.apartment;
