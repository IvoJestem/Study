import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./src/contexts/UserContext";

const PrivateRoute: React.FC = () => {
  const { user } = useContext(UserContext)!;

  return user ? <Outlet /> : <Navigate to="/notloggedinpage" />;
};

export default PrivateRoute;
