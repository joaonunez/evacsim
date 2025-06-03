import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface ParametrosState {
  parametros: string[];
}

const initialState: ParametrosState = {
  parametros: [],
};

const parametrosSlice = createSlice({
  name: 'parametros',
  initialState,
  reducers: {
    agregarParametro: (state, action: PayloadAction<string>) => {
      state.parametros.push(action.payload);
    },
    limpiarParametros: (state) => {
      state.parametros = [];
    },
  },
});

export const { agregarParametro, limpiarParametros } = parametrosSlice.actions;

export default parametrosSlice.reducer;
