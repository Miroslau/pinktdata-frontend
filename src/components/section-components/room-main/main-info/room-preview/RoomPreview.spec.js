import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { roomContext } from '../../../../../store/context/roomContext';
import RoomPreview from './RoomPreview';
import mockDataForPreviewPage from '../../../../../mocks/mocks-constants/mockDataForPreviewPage';

describe('RoomPreview component', () => {
  const history = createMemoryHistory();

  const apartmentSlice = createSlice({
    name: 'apartment',
    initialState: {
      startDate: 'Thu Nov 18 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
      endDate: 'Fri Nov 19 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
    },
  });

  const apartmentReducer = apartmentSlice.reducer;

  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, apartmentReducer);

  const reducers = combineReducers({
    apartment: persistedReducer,
  });

  const rootReducer = (state, action) => reducers(state, action);

  const store = configureStore({
    reducer: rootReducer,
  });

  test('should have render images', () => {
    render((
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <roomContext.Provider value={mockDataForPreviewPage}>
            <RoomPreview />
          </roomContext.Provider>
        </Router>
      </Provider>
    ));

    expect(screen.getAllByAltText(/slider/i)).toBeTruthy();
  });

  test('should have render main image', () => {
    render((
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <roomContext.Provider value={mockDataForPreviewPage}>
            <RoomPreview />
          </roomContext.Provider>
        </Router>
      </Provider>
    ));

    expect(screen.getByAltText(/room-preview/i)).toBeTruthy();
  });

  test('should have render room total price information', () => {
    render((
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <roomContext.Provider value={mockDataForPreviewPage}>
            <RoomPreview />
          </roomContext.Provider>
        </Router>
      </Provider>
    ));

    expect(screen.getByText(/Total price/i)).toBeTruthy();
  });
  test('should redirect ro payment page', async () => {
    render((
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <roomContext.Provider value={mockDataForPreviewPage}>
            <RoomPreview />
          </roomContext.Provider>
        </Router>
      </Provider>
    ));

    const button = await screen.findByTestId('payment-button');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/payment');
  });
});
