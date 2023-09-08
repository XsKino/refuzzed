import React from "react";

function TestPage() {
  return (
    <div className="bg-rose-950 min-h-screen flex flex-col">
      <a
        href="/"
        className="bg-white text-primary px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary hover:text-white transition duration-300 top-0 left-0 m-4"
      >
        Regresar
      </a>

      <div className="flex flex-col flex-grow pl-5">
        <h1 className="text-white text-4xl">Inventario</h1>
      </div>
    </div>
  );
}

export default TestPage;
