import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './userSlice';
import mapPageReducer from './slice/mapPageSlice';

const reducer = combineReducers({
  user: userReducer,
  mapPage: mapPageReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
