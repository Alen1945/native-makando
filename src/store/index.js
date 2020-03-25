import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import BaseReducer from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedtReducer = persistReducer(persistConfig, BaseReducer);

export const store = createStore(persistedtReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
