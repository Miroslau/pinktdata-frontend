import { createAsyncThunk } from '@reduxjs/toolkit';
import mapAPI from '../../api/map/mapPageAPI';

export const searchApartments = createAsyncThunk(
  'apartments/searchApartments',
  async ({
    publicAddress,
    currentPage,
    priceRange,
    bedrooms,
    isMax,
    isFilter = false,
    bounds,
    startDate,
    endDate,
  }, thunkAPI) => {
    try {
      let priceFrom;
      let priceTo;
      if (priceRange.length) {
        [priceFrom, priceTo] = priceRange;
      }
      // eslint-disable-next-line max-len
      const response = await mapAPI.searchApartments(
        publicAddress,
        priceTo,
        bedrooms,
        isMax,
        bounds,
        startDate,
        endDate,
        currentPage,
        priceFrom,
      );

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
