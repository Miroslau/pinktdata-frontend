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
      // eslint-disable-next-line no-param-reassign
      state.isError = false;
      // eslint-disable-next-line no-param-reassign
      state.isSuccess = false;
      // eslint-disable-next-line no-param-reassign
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      // eslint-disable-next-line no-param-reassign
      state.isFetching = false;
      // eslint-disable-next-line no-param-reassign
      state.isSuccess = true;
      // eslint-disable-next-line no-param-reassign
      state.email = payload.email;
      // eslint-disable-next-line no-param-reassign
      state.firstName = payload.firstName;
      // eslint-disable-next-line no-param-reassign
      state.lastName = payload.lastName;
      // eslint-disable-next-line no-param-reassign
      state.password = payload.password;
    },
    [signupUser.pending]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.isFetching = false;
      // eslint-disable-next-line no-param-reassign
      state.isError = true;
      // eslint-disable-next-line no-param-reassign
      state.errorMessage = payload.message;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
