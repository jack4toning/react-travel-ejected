import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  languageReducer,
  recommendedProductsReducer,
  productReducer,
  filteredProductsReducer,
  userReducer,
  shoppingCartReducer,
  orderReducer,
} from './slices';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { actionLog } from './middlewares/actionLog';

// const persisConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user'],
// };

const userPersisConfig = {
  key: 'user',
  storage,
  blacklist: ['error', 'isLoading'],
};

const rootReducer = combineReducers({
  language: languageReducer,
  recommendedProducts: recommendedProductsReducer,
  product: productReducer,
  filteredProducts: filteredProductsReducer,
  user: persistReducer(userPersisConfig, userReducer),
  shoppingCart: shoppingCartReducer,
  order: orderReducer,
});

// const persistentReducer = persistReducer(persisConfig, rootReducer);
export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
