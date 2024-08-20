import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./src/pages/login/Login";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./src/pages/home/Home";
import Register from "./src/pages/register/Register";
import UserProfilePage from "./src/pages/userprofile/UserProfile";
import { UserProvider } from "./src/contexts/UserContext";

const Route1: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/src/pages/register/" element={<Register />} />
          <Route path="/src/pages/home/" element={<Home />} />
          <Route path="/src/pages/userprofile/" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default Route1;
