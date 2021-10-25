import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';

// eslint-disable-next-line no-undef
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

  // eslint-disable-next-line no-undef
  it('renders component navigation', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Provider store={store}><BrowserRouter><Navigation /></BrowserRouter></Provider>);
  });

  // eslint-disable-next-line no-undef
  it('it opens modal on click button Sign In', async () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    render(<Provider store={store}><BrowserRouter><Navigation /></BrowserRouter></Provider>);
    const button = screen.getByText('Sign in');

    userEvent.click(button);

    const result = await screen.getByText('Enter email');
    // eslint-disable-next-line no-undef
    expect(result).toBeInTheDocument();
  });
});
