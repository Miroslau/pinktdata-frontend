import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { majorCitySlice } from '../slice/majorCitySlice';

const majorCityReducer = majorCitySlice.reducer;

const persistConfig = {
  key: 'majorCity',
  storage,
};

const persistedMajorCityReducer = persistReducer(persistConfig, majorCityReducer);

export default persistedMajorCityReducer;
