import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from '../slice/userSlice';

const userReducer = userSlice.reducer;

const persistConfig = {
  key: 'user',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export default persistedReducer;
