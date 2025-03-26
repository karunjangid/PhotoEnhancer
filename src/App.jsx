import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlurFeature from "./pages/BlurAdjustment";
import BrightnessFeature from "./pages/BrightnessContrast";
import BackgroundFeature from "./pages/BackgroundRemoval";
import FiltersFeature from "./pages/AI_Filters";
import ResolutionFeature from "./pages/ResolutionUpscaling";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blur" element={<BlurFeature />} />
        <Route path="/brightness" element={<BrightnessFeature />} />
        <Route path="/background" element={<BackgroundFeature />} />
        <Route path="/filters" element={<FiltersFeature />} />
        <Route path="/resolution" element={<ResolutionFeature />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
