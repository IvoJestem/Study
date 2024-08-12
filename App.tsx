import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./src/pages/home/App";
import Login from "./src/pages/login/login";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* Inne trasy tutaj */}
      </Routes>
    </Router>
  );
}
export default App;
