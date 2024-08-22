import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./src/pages/login/Login";
import Home from "./src/pages/home/Home";
import Register from "./src/pages/register/Register";
import TransferList from "./src/pages/transferlist/TransferList";
import Search from "./src/pages/search/Search";
import UserProfilePage from "./src/pages/userprofilepage/UserProfilePage";
import { UserProvider } from "./src/contexts/UserContext";

const Route1: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userprofilepage" element={<UserProfilePage />} />
        <Route path="/transferlist" element={<TransferList />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </UserProvider>
  );
};

export default Route1;
