import { useDispatch, createAsyncThunk } from '@reduxjs/toolkit';

import MapAPI from '../../api/map/mapPageAPI';

export const mapPageData = createAsyncThunk(
  'apartments/map',
  async ({ currentPage }, thunkAPI) => {
    try {
      const response = await MapAPI.searchApartments('Philadelphia, PA, United States', currentPage);

      const { status, data } = response;

      useDispatch(mapPageData(response.data));

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (e) {
      // console.error(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
