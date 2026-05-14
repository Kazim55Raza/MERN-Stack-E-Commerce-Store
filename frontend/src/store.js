import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import configReducer from './slices/configSlice';
import cartReducer from './slices/cartSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    config: configReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;