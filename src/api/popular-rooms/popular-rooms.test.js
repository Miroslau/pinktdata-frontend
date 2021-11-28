import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import httpClient from '../index';
import TopRated from '../../components/section-components/top-rated/TopRated';
import mockDataForPopularRooms from '../../mocks/mocks-constants/mockDataForPopularRooms';

jest.mock('../index.js');

describe('Popular rooms function', () => {
  const apartmentSlice = createSlice({
    name: 'apartment',
    initialState: {
      publicAddress: '',
      count: 2229,
      startDate: new Date(),
      endDate: new Date().getDate() + 1,
    },
  });

  const apartmentReducer = apartmentSlice.reducer;

  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedApartmentReducer = persistReducer(persistConfig, apartmentReducer);

  const reducers = combineReducers({
    apartment: persistedApartmentReducer,
  });

  const rootReducer = (state, action) => reducers(state, action);

  const store = configureStore({
    reducer: rootReducer,
  });

  test('should have async render images', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPopularRooms }));

    render((
      <Provider store={store}>
        <BrowserRouter>
          <TopRated />
        </BrowserRouter>
      </Provider>
    ));

    expect(await screen.findAllByAltText(/room/i)).toBeTruthy();
  });
});
