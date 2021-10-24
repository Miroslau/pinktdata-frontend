/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createSlice } from '@reduxjs/toolkit';

import { mapPageData } from '../actions/mapAction';

const mapPageSlice = createSlice({
  name: 'mapPage',
  initialState: {
    apart: [],
    currentPage: 0,
    location: [39.94977, -75.28529],
    currentApart: '',
    errorMessage: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [mapPageData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.apart = payload.apart;
      state.currentPage = [...state + 1];
      state.location = payload.location;
    },
    [mapPageData.pending]: (state) => {
      state.isFetching = true;
    },
    [mapPageData.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const mapPageActions = mapPageSlice.actions;
export default mapPageSlice.reducer;

// getAllData: (state, action) => ({
//   ...state,
//   rooms: [...action.payload],
// }),
// setAllData: (state, action) => ({
//   ...state,
//   rooms: [...state.rooms, ...action.payload],
// }),
// setName: (state, action) => {
//   state.name += action.payload;
// },
// setPublicAddress: (state, action) => {
//   state.publicAddress = action.payload;
// },
// setError: (state, action) => {
//   state.error += action.payload;
// },
// setError: (state, action) => {
//   state.error += action.payload;
// },
