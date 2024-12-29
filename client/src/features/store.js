import { configureStore } from '@reduxjs/toolkit';
import casesReducer from './cases/slice/casesSlice';

// Create Redux store
export const store = configureStore({
    reducer: {
        cases: casesReducer,
    },
    // DevTools will automatically be disabled in production by CRA
    devTools: true,
});
