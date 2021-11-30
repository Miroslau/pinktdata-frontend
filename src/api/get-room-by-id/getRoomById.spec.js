import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import mockDataForPreviewPage from '../../mocks/mocks-constants/mockDataForPreviewPage';
import RoomPage from '../../pages/room-page/RoomPage';
import httpClient from '../index';

jest.mock('../index.js');

describe('getRoomById function', () => {
  const apartmentSlice = createSlice({
    name: 'apartment',
    initialState: {
      startDate: 'Thu Nov 18 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
      endDate: 'Fri Nov 19 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
      searchParams: {
        startDate: 'Thu Nov 18 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
        endDate: 'Fri Nov 19 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
      },
    },
  });

  const userSlice = createSlice({
    name: 'user',
    initialState: {
      token: 'token',
    },
  });

  const apartmentReducer = apartmentSlice.reducer;
  const userReducer = userSlice.reducer;

  const reducers = combineReducers({
    apartment: apartmentReducer,
    user: userReducer,
  });

  const rootReducer = (state, action) => reducers(state, action);

  const store = configureStore({
    reducer: rootReducer,
  });

  test('should return skeleton when data loading', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPreviewPage }));

    render((
      <Provider store={store}>
        <BrowserRouter>
          <RoomPage />
        </BrowserRouter>
      </Provider>
    ));

    await waitFor(() => {
      const text = screen.getByTestId(/Skeleton/i);
      expect(text).toBeInTheDocument();
    });
  });
});
