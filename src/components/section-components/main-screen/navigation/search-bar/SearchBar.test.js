import '@testing-library/jest-dom';
import { combineReducers, createSlice, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const history = createMemoryHistory();
  const apartmentSlice = createSlice({
    name: 'apartment',
    initialState: {
      publicAddress: 'Philadelphia, PA, United States',
      count: 2229,
      searchParams: {
        bedrooms: 0,
        startDate: 'Thu Nov 18 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
        endDate: 'Fri Nov 19 2021 12:26:52 GMT+0300 (Москва, стандартное время)',
      },
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

  it('renders component SearchBar', () => {
    // eslint-disable-next-line max-len
    const { container } = render(<Provider store={store}><Router location={history.location} navigator={history}><SearchBar /></Router></Provider>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has display name address in search bar', async () => {
    // eslint-disable-next-line max-len
    render(<Provider store={store}><Router location={history.location} navigator={history}><SearchBar /></Router></Provider>);
    const text = await screen.getByText('Philadelphia, PA, United States');
    expect(text).toBeInTheDocument();
  });

  it('has display name count bedrooms in search bar', async () => {
    // eslint-disable-next-line max-len
    render(<Provider store={store}><Router location={history.location} navigator={history}><SearchBar /></Router></Provider>);
    const text = await screen.getByText('0 Bedrooms');
    expect(text).toBeInTheDocument();
  });

  it('has display logo in search bar', async () => {
    // eslint-disable-next-line max-len
    render(<Provider store={store}><Router location={history.location} navigator={history}><SearchBar /></Router></Provider>);
    const text = await screen.getByText('pinktada');
    expect(text).toBeInTheDocument();
  });

  it('redirect to main page when click on logo', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}><SearchBar /></Provider>
      </Router>,
    );

    const logo = await screen.getByTestId('logo');
    userEvent.click(logo);
    expect(history.location.pathname).toBe('/');
  });
});
