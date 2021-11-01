import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';

describe('Navigation Component', () => {
  const userSlice = createSlice({
    name: 'user',
    initialState: {
      firstName: '',
      lastName: '',
      email: '',
      token: null,
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    },
  });

  const userReducer = userSlice.reducer;

  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, userReducer);

  const reducers = combineReducers({
    user: persistedReducer,
  });

  const rootReducer = (state, action) => reducers(state, action);

  const store = configureStore({
    reducer: rootReducer,
  });

  it('renders component navigation', () => {
    render(<Provider store={store}><BrowserRouter><Navigation /></BrowserRouter></Provider>);
  });

  it('opens modal on click button Sign In', async () => {
    render(<Provider store={store}><BrowserRouter><Navigation /></BrowserRouter></Provider>);
    const button = screen.getByText('Sign in');

    userEvent.click(button);

    const result = await screen.getByText('Enter email');
    expect(result).toBeInTheDocument();
  });
});
