import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  reducers: {

  },
  extraReducers: {

  },
});

export const userSelector = (state) => state.user;

export const signupUser = createAsyncThunk(
  'users/signupUser',
);
