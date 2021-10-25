import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistedReducer from './userReducer';

const reducers = combineReducers({
  user: persistedReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'users/LogoutUser/fulfilled') {
    storage.removeItem('persist:root');
    return reducers({}, action);
  }
  return reducers(state, action);
};

export default rootReducer;
