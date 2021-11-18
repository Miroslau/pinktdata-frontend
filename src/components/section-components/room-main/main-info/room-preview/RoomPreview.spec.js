import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { roomContext } from '../../../../../store/context/roomContext';
import RoomPreview from './RoomPreview';
import mockDataForPreviewPage from '../../../../../mocks/mocks-constants/mockDataForPreviewPage';

describe('RoomPreview component', () => {
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
        <roomContext.Provider value={mockDataForPreviewPage}>
          <RoomPreview />
        </roomContext.Provider>
      </Provider>

    ));

    expect(screen.getAllByAltText(/slider/i)).toBeTruthy();
  });

  test('should have render main image', () => {
    render((
      <Provider store={store}>
        <roomContext.Provider value={mockDataForPreviewPage}>
          <RoomPreview />
        </roomContext.Provider>
      </Provider>
    ));

    expect(screen.getByAltText(/room-preview/i)).toBeTruthy();
  });

  test('should have render room total price information', () => {
    render((
      <Provider store={store}>
        <roomContext.Provider value={mockDataForPreviewPage}>
          <RoomPreview />
        </roomContext.Provider>
      </Provider>
    ));

    expect(screen.getByText(/Total price/i)).toBeTruthy();
  });
});
