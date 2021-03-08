import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {photoReducer} from './reducers/photoReducer';

import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const reducers = combineReducers({
  photoAPI: photoReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['mainAPI'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
export const persistedStore = persistStore(store);
