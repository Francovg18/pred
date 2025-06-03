import React from "react";

function Contacto() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6 drop-shadow-lg">
          Contáctanos
        </h1>
        <p className="text-center text-lg text-gray-400 mb-8 leading-relaxed">
          ¿Tienes preguntas, sugerencias o necesitas ayuda? Escríbenos y nuestro
          equipo estará encantado de asistirte. Tu bienestar es nuestra
          prioridad.
        </p>

        {/* Formulario */}
        <form className="bg-gray-800 p-8 rounded-3xl shadow-xl space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-gray-300 font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-2 block w-full border border-gray-600 rounded-lg bg-gray-900 px-4 py-2 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe tu nombre"
              required
            />
          </div>

          <div>
            <label
              htmlFor="correo"
              className="block text-gray-300 font-medium"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              className="mt-2 block w-full border border-gray-600 rounded-lg bg-gray-900 px-4 py-2 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="mensaje"
              className="block text-gray-300 font-medium"
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="mt-2 block w-full border border-gray-600 rounded-lg bg-gray-900 px-4 py-2 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Escribe tu mensaje aquí..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
