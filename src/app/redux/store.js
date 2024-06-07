

import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import shopSlice from './shopSlice'


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, shopSlice)

export const store = configureStore({
  reducer: { shop: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
 
export let persistor = persistStore(store)

