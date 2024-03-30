import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './task/Reducer';
import { authReducer } from './auth/Reducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  products: contactsReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['contacts'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store)
