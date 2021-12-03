import { render, screen } from '@testing-library/react';

import React from 'react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import RoomBookButton from './RoomBookButton';
import { roomContext } from '../../../../store/context/roomContext';
import mockDataForPreviewPage from '../../../../mocks/mocks-constants/mockDataForPreviewPage';

describe('RoomBookButton component', () => {
  const history = createMemoryHistory();

  const apartmentSlice = createSlice({
    name: 'apartment',
    initialState: {
      startDate: 'Thu Nov 18 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
      endDate: 'Fri Nov 19 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
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

  test('should have render room total price information', () => {
    render((
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <roomContext.Provider value={mockDataForPreviewPage}>
            <RoomBookButton />
          </roomContext.Provider>
        </Router>
      </Provider>
    ));

    expect(screen.getByText(/Total price/i)).toBeTruthy();
  });

  test('should redirect to payment page', async () => {
    render((
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <roomContext.Provider value={mockDataForPreviewPage}>
            <RoomBookButton />
          </roomContext.Provider>
        </Router>
      </Provider>
    ));

    const button = await screen.findByTestId('payment-button');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/payment/42/123');
  });
});
