import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
