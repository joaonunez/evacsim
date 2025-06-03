import { configureStore } from '@reduxjs/toolkit';
import parametrosReducer from './parametros/parametrosSlice';


export const store = configureStore({
  reducer: {
    parametros: parametrosReducer,
  },
});

// Inferencia de tipos para usar en componentes
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

