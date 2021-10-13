import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import UserAPI from '../api/Users/UserAPI';

const token = 'dfsfsdf';
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

      localStorage.setItem('token', token);
      return data;
    } catch (e) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
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
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.password = payload.password;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
