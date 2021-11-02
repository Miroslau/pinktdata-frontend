import { createAsyncThunk } from '@reduxjs/toolkit';
import mapAPI from '../../api/map/mapPageAPI';

export const searchApartments = createAsyncThunk(
  'apartments/searchApartments',
  async ({
    publicAddress, currentPage, priceRange, bedrooms, isMax, isFilter,
  }, thunkAPI) => {
    try {
      let priceFrom;
      let priceTo;
      if (priceRange.length) {
        [priceFrom, priceTo] = priceRange;
      }
      // eslint-disable-next-line max-len
      const response = await mapAPI.searchApartments(publicAddress, currentPage, priceFrom, priceTo, bedrooms, isMax);

      const { status, data } = response;

      if (status !== 200) return thunkAPI.rejectWithValue(data);

      const filterData = {
        isFilter, data,
      };

      if (isFilter) return filterData;

      return data;
    } catch (e) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
