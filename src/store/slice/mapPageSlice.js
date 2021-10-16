import { createSlice } from '@reduxjs/toolkit';

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
    error: '',
  },
  reducers: {
    getAllData: (state, action) => ({
      ...state,
      rooms: [...action.payload],
    }),
    setAllData: (state, action) => ({
      ...state,
      rooms: [...state.rooms, ...action.payload],
    }),
    setName: (state, action) => {
      state.name += action.payload;
    },
    setPublicAddress: (state, action) => {
      state.publicAddress = action.payload;
    },
    setError: (state, action) => {
      state.error += action.payload;
    },
    // setError: (state, action) => {
    //   state.error += action.payload;
    // },
  },
});

export const mapPageActions = mapPageSlice.actions;
export default mapPageSlice.reducer;
