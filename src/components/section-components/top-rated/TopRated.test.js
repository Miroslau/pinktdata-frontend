import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import {
  findByText, getByTestId, render, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopRated from './TopRated';

describe('TopRated component', () => {
  let unmount;
  // eslint-disable-next-line no-unused-vars
  let container;

  const apartmentSlice = createSlice({
    name: 'apartment',
    initialState: {
      publicAddress: '',
      count: 2229,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
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

  beforeEach(() => {
    const { container: currentContainer, unmount: currentUnmount } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TopRated />
        </BrowserRouter>
      </Provider>,
    );
    container = currentContainer;
    unmount = currentUnmount;
  });
  afterEach(() => {
    unmount();
  });

  test('should have the loading skeleton when images loading', () => {
    const text = getByTestId(container, 'Skeleton');
    expect(text).toBeTruthy();
  });

  test('should have the text "Top Rated"', async () => {
    await waitFor(() => {
      const text = findByText(container, 'Top Rated');
      expect(text).toBeTruthy();
    });
  });
});
