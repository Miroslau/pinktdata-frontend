import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';
import ModalWindowMui from '../../../ui-components/modal-window-mui/ModalWindowMui';

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
  it('render correctly', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Provider store={store}><BrowserRouter><Navigation /></BrowserRouter></Provider>);
  });

  // eslint-disable-next-line no-undef
  it('click button Sign In correctly', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Provider store={store}><BrowserRouter><Navigation /></BrowserRouter></Provider>);
    const button = container.querySelectorAll('button')[1];
    let isOpenModal = false;
    userEvent.click(button);
    isOpenModal = true;
    const closeModal = () => {
      isOpenModal = false;
    };
    // eslint-disable-next-line no-undef
    if (isOpenModal) {
      // eslint-disable-next-line react/react-in-jsx-scope
      render(<ModalWindowMui clickButton={closeModal} title="Sign in" isActiveModal={isOpenModal} />);
    }
  });
});
