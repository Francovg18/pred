function Header({ progreso }) {
  if (typeof progreso === "number") {
    const progresoPorcentaje = Math.round((progreso / 7) * 100);

    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1e1e2f] via-[#2a2a40] to-[#1e1e2f] backdrop-blur-sm border-b border-white/10 px-6 py-2 shadow-md flex flex-col md:flex-row md:justify-between md:items-center text-white gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl drop-shadow-md">🧠</span>
          <h1 className="text-l md:text-xl font-extrabold tracking-wide text-white drop-shadow">
            Evaluación Emocional
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end text-sm text-right">
            <span className="text-gray-300 font-medium tracking-tight">Progreso del formulario</span>
            <span className="text-l font-bold text-green-300">
              {progreso} / 7 preguntas
            </span>
          </div>

          <div className="w-36 bg-gray-700 h-2 rounded-full shadow-inner overflow-hidden border border-gray-600">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-green-500 to-lime-400 rounded-full shadow-md animate-pulse"
              style={{ width: `${progresoPorcentaje}%` }}
            ></div>
          </div>
        </div>
      </header>
    );
  }

  return null;
}

export default Header;
