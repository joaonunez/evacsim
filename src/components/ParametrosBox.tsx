import React, { useState } from "react";

const ParametrosBox = () => {
  // declaramos estado inicial del campo input (etiqueta text area)

  const [input, setInput] = useState("");
  const [inputKimberly, setInputKimberly] = useState(""); //declaramos que inicia en "" vacio, y ademas declaramos que setInput es lo que va a cambiar esta variable de estado
  //funcion para escuchar cambios en el text area

  const [comboBox, setComboBox] = useState("");

  const [opcionDeRadioButton, establecerVariableDeEstadoRadioButton] =
    useState("");
  const handleInputChange = (
    //parametro para detectar e identificar a una etiqueta html especifica de tipo text area
    variable: React.ChangeEvent<HTMLTextAreaElement> //declaramos que va a ser un text area por defecto al declarar el tipo de variable que sera la entrada o en este caso input
  ) => {
    //declaramos que el valor de la entrada sera el valor de la etiqueta HTML es decir "value"
    const valorEntrada = variable.target.value;
    //mostramos por consola el valor actual de la entrada
    console.log("Texto Actual:", valorEntrada);
    //seteamos el valor de la entrada al estado de la variable de estado 'input'
    setInput(valorEntrada);
  };
  const handleInputChangeKimberly = (
    //parametro para detectar e identificar a una etiqueta html especifica de tipo text area
    variable: React.ChangeEvent<HTMLTextAreaElement> //declaramos que va a ser un text area por defecto al declarar el tipo de variable que sera la entrada o en este caso input
  ) => {
    //declaramos que el valor de la entrada sera el valor de la etiqueta HTML es decir "value"
    const valorEntrada = variable.target.value;
    //mostramos por consola el valor actual de la entrada
    console.log("Texto Actual en campo de kimberly:", valorEntrada);
    //seteamos el valor de la entrada al estado de la variable de estado 'input'
    setInput(valorEntrada);
  };

  const handleComboBoxChange = (
    variable: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let valorEntradaComboBox = variable.target.value;
    if (valorEntradaComboBox == "") {
      valorEntradaComboBox = "no hay opcion selecionada";
    }
    console.log("valor actual seleccionado: ", valorEntradaComboBox);
    setComboBox(valorEntradaComboBox);
  };

  const handleRadioButtonInputChange = (
    variable: React.ChangeEvent<HTMLInputElement>
  ) => {
    let valorEntradaRadioButton = variable.target.value;
    console.log(
      "valor actual selecciondo en radio button es:",
      valorEntradaRadioButton
    );
    establecerVariableDeEstadoRadioButton(valorEntradaRadioButton);
  };

  return (
    <>
      <h1>Joao Dev</h1>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Whats your mind?"
          className="w-full h-24 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>
        <div className="mt-2 flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-200 cursor-pointer">
            Enviar
          </button>
        </div>
      </div>
      <div className="max-w-sm mx-auto mt-10">
        <label
          htmlFor="combo"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Selecciona una opción:
        </label>
        <select
          id="combo"
          value={comboBox}
          onChange={handleComboBoxChange}
          className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Elige una opción</option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
      </div>
      <div className="flex flex-col space-y-2 max-w-sm mx-auto mt-10">
        <label className="inline-flex items-center">
          <input
            onChange={handleRadioButtonInputChange}
            type="radio"
            name="gender"
            value="Ninguno"
            className="form-radio text-blue-600"
          />
          <span className="ml-2">Ninguna</span>
        </label>
        <label className="inline-flex items-center">
          <input
            onChange={handleRadioButtonInputChange}
            type="radio"
            name="gender"
            value="male"
            className="form-radio text-blue-600"
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="inline-flex items-center">
          <input
            onChange={handleRadioButtonInputChange}
            type="radio"
            name="gender"
            value="female"
            className="form-radio text-blue-600"
          />
          <span className="ml-2">Female</span>
        </label>
      </div>
      <h1>Daly</h1>

      <h1>Jhon</h1>

      <h1>Kimberly</h1>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <textarea
          value={inputKimberly}
          onChange={handleInputChangeKimberly}
          placeholder="Whats your mind?"
          className="w-full h-24 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>
        <div className="mt-2 flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-200 cursor-pointer">
            Enviar
          </button>
        </div>
      </div>

      <h1>Luis Fabian</h1>
    </>
  );
};

export default ParametrosBox;
