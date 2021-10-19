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
  it('has render component navigation', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Provider store={store}><BrowserRouter><Navigation /></BrowserRouter></Provider>);
  });

  // eslint-disable-next-line no-undef
  it('has correct click button Sign In', async () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Provider store={store}><BrowserRouter><Navigation /></BrowserRouter></Provider>);
    const button = container.querySelectorAll('button')[1];
    let isOpenModal = false;
    const closeModal = () => {
      isOpenModal = false;
    };

    userEvent.click(button);

    // eslint-disable-next-line react/react-in-jsx-scope
    const modalContainer = await render(<ModalWindowMui clickButton={closeModal} title="Sign in" isActiveModal={isOpenModal} />).container;
    const result = modalContainer.querySelector('.MuiPaper-root');
    console.log(result);
    // eslint-disable-next-line no-undef
    expect(result.firstChild).toBeInTheDocument();
  });
});
