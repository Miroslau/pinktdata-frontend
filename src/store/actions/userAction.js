import { createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/Users/UserAPI';

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

      const { accessToken } = data;

      localStorage.setItem('token', accessToken);
      return data;
    } catch (e) {
      console.error(e.response.data);
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
        console.log(thunkAPI.rejectWithValue(data));
        return thunkAPI.rejectWithValue(data);
      }

      const { accessToken } = data;

      localStorage.setItem('token', accessToken);

      return data;
    } catch (e) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'users/LogoutUser', async (thunkAPI) => {
    try {
      const response = await UserAPI.logOut();

      const { status, data } = response;

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }
      localStorage.removeItem('token');
      return data;
    } catch (e) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
