import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import sweetReducer from './sweetSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sweets: sweetReducer,
        cart: cartReducer,
    },
});
