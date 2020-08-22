import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import LaunchesPage from "../pages/launches";
import RocketsPage from "../pages/rockets";
import About from "../pages/about";
import Dragons from "../pages/dragons";
import EventsPage from "../pages/events";
import Navigation from "./navigation";

function App() {
  return (
    <>
      <Navigation data-testid="nav" />
      <Routes>
        <Route path="/launches" element={<LaunchesPage />} />
        <Route path="/rockets" element={<RocketsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/dragons" element={<Dragons />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
