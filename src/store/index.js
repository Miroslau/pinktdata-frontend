import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducer';
import { setHttpToken } from '../api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

let prevToken;
const tokenListener = () => {
  const token = store.getState().user?.token;
  if (token !== prevToken) {
    setHttpToken(token);
  }
};

store.subscribe(tokenListener);

export default store;
