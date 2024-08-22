import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./src/pages/login/Login";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./src/pages/home/Home";
import Register from "./src/pages/register/Register";
import TransferList from "./src/pages/transferlist/TransferList";
import UserProfilePage from "./src/pages/userprofilepage/UserProfilePage";
import { UserProvider } from "./src/contexts/UserContext";
import { Search } from "@mui/icons-material";

const Route1: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/src/pages/register/" element={<Register />} />
          <Route path="/src/pages/home/" element={<Home />} />
          <Route
            path="/src/pages/userprofilepage/"
            element={<UserProfilePage />}
          />
          <Route path="/src/pages/transferlist" element={<TransferList />} />
          <Route path="/src/pages/search" element={<Search />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default Route1;
