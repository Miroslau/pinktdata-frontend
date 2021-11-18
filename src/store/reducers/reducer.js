import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistedReducer from './userReducer';
import persistedApartmentReducer from './apartmentReducer';
import modalReducer from '../slice/modalSlice';

const reducers = combineReducers({
  user: persistedReducer,
  apartment: persistedApartmentReducer,
  modal: modalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'users/LogoutUser/fulfilled') {
    storage.removeItem('persist:user');
    const { apartment } = state;
    state = { apartment };
  }
  return reducers(state, action);
};

export default rootReducer;
