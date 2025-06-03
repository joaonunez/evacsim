import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/index";
import {
  agregarParametro,
  limpiarParametros,
} from "../store/parametros/parametrosSlice";

const ParametrosBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const parametros = useSelector(
    (state: RootState) => state.parametros.parametros
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleEnviar = () => {
    if (input.trim() !== "") {
      dispatch(agregarParametro(input.trim()));
      setInput("");
    }
  };

  const handleLimpiar = () => {
    dispatch(limpiarParametros());
  };

  // Esta función puede ser usada para activar la simulación 3D manualmente
  const handleGenerarAnimacion = () => {
    console.log("🚀 Simulación activada con parámetros:", parametros);
    // Aquí podrías activar una flag global o Redux si quieres mostrar <Simulacion3D />
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
        Bienvenido Al Simulador De Incendios
      </h2>
      <p className="text-sm text-blue-700 mb-2 text-center">
        Escribe tus parámetros, detalles o condiciones inseguras para simular.
      </p>

      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Ej: Cantidad de pisos, cuántas personas había, etc."
        className="w-full h-28 p-3 border border-blue-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleLimpiar}
          className="bg-red-700 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
        >
          Borrar Todo
        </button>
        <button
          onClick={handleEnviar}
          className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Añadir
        </button>
      </div>

      {parametros.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Parámetros ingresados:
          </h3>
          <ul className="list-disc list-inside text-blue-900 space-y-1 mb-4">
            {parametros.map((texto, index) => (
              <li key={index}>{texto}</li>
            ))}
          </ul>

          <div className="flex justify-center">
            <button
              onClick={handleGenerarAnimacion}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors cursor-pointer"
            >
              Generar Animación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParametrosBox;
