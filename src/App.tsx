import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Launches from "./pages/launches";
import Rockets from "./pages/rockets";
import About from "./pages/about";
import Dragons from "./pages/dragons";
import Events from "./pages/events";

function App() {
  return (
    <Routes>
      <Route path="/launches" element={<Launches />} />
      <Route path="/rockets" element={<Rockets />} />
      <Route path="/about" element={<About />} />
      <Route path="/dragons" element={<Dragons />} />
      <Route path="/events" element={<Events />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
