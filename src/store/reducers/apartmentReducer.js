import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apartmentSlice } from '../slice/apartmentSlice';

const apartmentReducer = apartmentSlice.reducer;

const persistConfig = {
  key: 'apartment',
  storage,
  whitelist: ['publicAddress', 'bounds', 'searchParams', 'startDate', 'endDate'],
};

const persistedApartmentReducer = persistReducer(persistConfig, apartmentReducer);

export default persistedApartmentReducer;
