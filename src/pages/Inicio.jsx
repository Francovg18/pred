import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Formulario from "../componentes/Formulario";
import Resultado from "../componentes/Resultado";
import Header from "../componentes/Header"; // motivacional 🌟

function Inicio() {
  const location = useLocation();
  const showHeader = location.pathname === "/";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
    </>
  );
}

export default Inicio;
