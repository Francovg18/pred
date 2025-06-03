import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./componentes/Nav.jsx";
import Inicio from "./pages/Inicio";
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto.jsx";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/*" element={<Inicio />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
