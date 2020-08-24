import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import LaunchesPage from "../pages/launches";
import RocketsPage from "../pages/rockets";
import AboutPage from "../pages/about";
import LaunchDetailsPage from "../pages/launchDetails";
import EventsPage from "../pages/events";
import Navigation from "./navigation";

function App() {
  return (
    <>
      <Navigation data-testid="nav" />
      <Routes>
        <Route path="/launches" element={<LaunchesPage />} />
        <Route path="/launches/:id" element={<LaunchDetailsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/rockets" element={<RocketsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
