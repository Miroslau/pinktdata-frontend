import { createAsyncThunk } from '@reduxjs/toolkit';
import mapAPI from '../../api/map/mapPageAPI';

export const searchApartments = createAsyncThunk(
  'apartments/searchApartments',
  async ({
    publicAddress, currentPage, priceRange, bedrooms, isMax,
    isFilter = false,
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

      const result = {
        apartments: data.apartments,
        clusters: data.clusters,
        count: data.totalCount,
        isFetchAll: data.isFetchAll,
      };

      if (isFilter) result.isFilter = isFilter;

      return result;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
