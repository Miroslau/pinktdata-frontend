import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MapAPI from '../../api/Map/MapAPI';

export const mapPageData = createAsyncThunk(
  'apartments/mapPage',
  async ({ id, avgRating }, thunkAPI) => {
    try {
      const response = await MapAPI.getAllData({
        id, avgRating,
      });

      const { status, data } = response;

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (e) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const mapPageSlice = createSlice({
  name: 'mapPage',
  initialState: {
    rooms: [],
    name: '',
    publicAddress: '',
    pictureUrl: '',
    avgRating: '',
    city: '',
    localizedCity: '',
    priceString: '',
    reviewsCount: '',
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
      state.name = payload.name;
      state.publicAddress = payload.publicAddress;
      state.pictureUrl = payload.pictureUrl;
      state.avgRating = payload.avgRating;
      state.city = payload.city;
      state.localizedCity = payload.localizedCity;
      state.priceString = payload.priceString;
      state.reviewsCount = payload.reviewsCount;
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
