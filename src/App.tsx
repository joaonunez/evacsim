function App() {
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <textarea
          placeholder="Escribe tu comentario..."
          className="w-full h-24 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <div className="mt-2 flex justify-center">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-200">
            Enviar
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
