import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {photoReducer} from './reducers/photoReducer';
import {authReducer} from './reducers/authReducer';

import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './saga/sagas';
const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  photoAPI: photoReducer,
  authAPI: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['authAPI'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

export const persistedStore = persistStore(store);

sagaMiddleware.run(rootSaga);
