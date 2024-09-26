import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componentes/Home';
import Register from './componentes/Register';
import CarnetDigital from './componentes/CarnetDigital';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/carnet-digital" element={<CarnetDigital />} />
      </Routes>
    </Router>
  );
};

export default App;
