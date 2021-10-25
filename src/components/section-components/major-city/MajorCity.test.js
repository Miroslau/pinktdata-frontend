import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MajorCity from './MajorCity';
import { server } from '../../../mocks/server';

// eslint-disable-next-line no-undef
describe('MajorCity Component', () => {
  process.env.REACT_APP_IS_MOCKING = true;

  const majorCitySlice = createSlice({
    name: 'majorCity',
    initialState: {
      city: '',
      publicAddress: '',
      imageUrl: '',
      count: 0,
    },
  });

  const majorCityReducer = majorCitySlice.reducer;

  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducerCity = persistReducer(persistConfig, majorCityReducer);

  const reducers = combineReducers({
    majorCity: persistedReducerCity,
  });

  const rootReducer = (state, action) => reducers(state, action);

  const store = configureStore({
    reducer: rootReducer,
  });

  // eslint-disable-next-line no-undef
  beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
  }));
  // eslint-disable-next-line no-undef
  afterEach(() => server.restoreHandlers());
  // eslint-disable-next-line no-undef
  afterAll(() => server.close());

  // eslint-disable-next-line no-undef
  it('renders component Major cities', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Provider store={store}><BrowserRouter><MajorCity /></BrowserRouter></Provider>);
  });

  // eslint-disable-next-line no-undef
  it('fetches major cities from an API', async () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { findByText } = render(<Provider store={store}><BrowserRouter><MajorCity /></BrowserRouter></Provider>);
    // eslint-disable-next-line no-undef
    expect(await findByText('Los Angeles')).toBeInTheDocument();
  });

  it('redirect to map page on click image major cities', async () => {
    const history = createMemoryHistory();
    // eslint-disable-next-line max-len
    const { findAllByRole } = render(<Provider store={store}><BrowserRouter><Router history={history}><MajorCity /></Router></BrowserRouter></Provider>);
    const image = await findAllByRole('presentation');

    userEvent.click(image[0]);

    expect(history.location.pathname).toBe('/map');
  });
});