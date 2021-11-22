import { createAsyncThunk } from '@reduxjs/toolkit';
import NewRoomAPI from '../../api/add-new-room/NewRoomAPI';

export const addNewRoom = createAsyncThunk(
  'users/signupUser/addNewRoom',
  async ({
    name, city, publicAddress, amount, currency, bedrooms,
  }, thunkAPI) => {
    try {
      const response = await NewRoomAPI.addRoom({
        name, city, publicAddress, amount, currency, bedrooms,
      });

      const { status, data } = response;

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
