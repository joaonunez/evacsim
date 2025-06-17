// src/store/simuladorSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SimuladorState {
  paso: number;
  parametros: {
    ventanas: number | null;
    pisos: number | null;
    puertas: number | null;
  };
  condicionales: {
    ventanasAbiertas: boolean | null;
    materialMadera: boolean | null;
  };
}

const initialState: SimuladorState = {
  paso: 1,
  parametros: {
    ventanas: null,
    pisos: null,
    puertas: null,
  },
  condicionales: {
    ventanasAbiertas: null,
    materialMadera: null,
  },
};

export const simuladorSlice = createSlice({
  name: 'simulador',
  initialState,
  reducers: {
    siguientePaso: (state) => {
      console.log('Avanzar paso:', state.paso, '->', state.paso + 1);
      state.paso += 1;
    },
    anteriorPaso: (state) => {
      console.log('Retroceder paso:', state.paso, '->', state.paso - 1);
      state.paso -= 1;
    },
    setVentanas: (state, action: PayloadAction<number>) => {
      console.log('Set ventanas:', action.payload);
      state.parametros.ventanas = action.payload;
    },
    setPisos: (state, action: PayloadAction<number>) => {
      console.log('Set pisos:', action.payload);
      state.parametros.pisos = action.payload;
    },
    setPuertas: (state, action: PayloadAction<number>) => {
      console.log('Set puertas:', action.payload);
      state.parametros.puertas = action.payload;
    },
    setVentanasAbiertas: (state, action: PayloadAction<boolean>) => {
      console.log('Set ventanasAbiertas:', action.payload);
      state.condicionales.ventanasAbiertas = action.payload;
    },
    setMaterialMadera: (state, action: PayloadAction<boolean>) => {
      console.log('Set materialMadera:', action.payload);
      state.condicionales.materialMadera = action.payload;
    },
    limpiarTodo: (state) => {
      console.log('Reiniciar todo');
      state.paso = 1;
      state.parametros = {
        ventanas: null,
        pisos: null,
        puertas: null,
      };
      state.condicionales = {
        ventanasAbiertas: null,
        materialMadera: null,
      };
    },
  },
});

export const {
  siguientePaso,
  anteriorPaso,
  setVentanas,
  setPisos,
  setPuertas,
  setVentanasAbiertas,
  setMaterialMadera,
  limpiarTodo,
} = simuladorSlice.actions;

export default simuladorSlice.reducer;
