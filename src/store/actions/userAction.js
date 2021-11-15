import { createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/users/UserAPI';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({
    firstName, lastName, email, password,
  }, thunkAPI) => {
    try {
      const response = await UserAPI.signUp({
        firstName, lastName, email, password,
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

export const loginUser = createAsyncThunk(
  'users/LoginUser',
  async ({
    email, password,
  }, thunkAPI) => {
    try {
      const response = await UserAPI.signIn({ email, password });
      const { data, status } = response;
      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk('users/LogoutUser', async (thunkAPI) => {
  try {
    const response = await UserAPI.logOut();

    const { status, data } = response;

    if (status !== 204) {
      return thunkAPI.rejectWithValue(data);
    }
    return status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
