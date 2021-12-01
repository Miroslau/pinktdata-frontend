import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistedReducer from './userReducer';
import persistedApartmentReducer from './apartmentReducer';
import { rentReducer } from '../slice/rentSlice';

const reducers = combineReducers({
  user: persistedReducer,
  apartment: persistedApartmentReducer,
  rent: rentReducer,
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
