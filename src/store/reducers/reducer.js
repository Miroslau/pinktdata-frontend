import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistedReducer from './userReducer';
import persistedApartmentReducer from './apartmentReducer';

const reducers = combineReducers({
  user: persistedReducer,
  apartment: persistedApartmentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'users/LogoutUser/fulfilled') {
    storage.removeItem('persist:root');
    storage.removeItem('persist:user');
    storage.removeItem('persist:apartment');
    return reducers({}, action);
  }
  return reducers(state, action);
};

export default rootReducer;
