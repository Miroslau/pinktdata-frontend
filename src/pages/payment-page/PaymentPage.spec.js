import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { Provider } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { roomContext } from '../../store/context/roomContext';
import mockDataForPreviewPage from '../../mocks/mocks-constants/mockDataForPreviewPage';
import PaymentPage from './PaymentPage';

describe('PaymentPage component', () => {
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

  test('should have render title to enter card data', () => {
    render((
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <roomContext.Provider value={mockDataForPreviewPage}>
            <PaymentPage />
          </roomContext.Provider>
        </Router>
      </Provider>
    ));

    expect(screen.getByText(/Enter your card details/i)).toBeTruthy();
  });
});
