import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./src/pages/login/Login";
import Home from "./src/pages/home/Home";
import Register from "./src/pages/register/Register";
import TransferList from "./src/pages/transferlist/TransferList";
import Search from "./src/pages/search/Search";
import UserProfilePage from "./src/pages/userprofilepage/UserProfilePage";
import { UserProvider } from "./src/contexts/UserContext";
import Error404 from "./src/pages/error404/Error404";
import NotLoggedInPage from "./src/pages/notloggedInpage/NotLoggedInPage";
import Players from "./src/pages/players/Players";
import NoAccess from "./src/pages/noaccess/NoAccess"
import ShortlistPage from "./src/pages/shortlistpage/ShortlistPage"
import AdminPanel from "./src/pages/adminpanel/AdminPanel"
import PrivateRoute from "./privateroute";

const Route1: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notloggedinpage" element={<NotLoggedInPage />} />
        <Route path="/noaccess" element={<NoAccess />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/userprofilepage" element={<UserProfilePage />} />
          <Route path="/transferlist" element={<TransferList />} />
          <Route path="/search" element={<Search />} />
          <Route path="/players" element={<Players/>}/>
          <Route path="/shortlist" element={<ShortlistPage/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default Route1;
