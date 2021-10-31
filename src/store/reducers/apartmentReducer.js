import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apartmentSlice } from '../slice/apartmentSlice';

const apartmentReducer = apartmentSlice.reducer;

const persistConfig = {
  key: 'apartment',
  storage,
};

const persistedApartmentReducer = persistReducer(persistConfig, apartmentReducer);

export default persistedApartmentReducer;