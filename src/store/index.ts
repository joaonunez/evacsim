// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import simuladorReducer from './simuladorSlice';

export const store = configureStore({
  reducer: {
    simulador: simuladorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
