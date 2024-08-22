import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";

import { UserProvider } from "../../contexts/UserContext.tsx";
import UserProfilePage from "./UserProfilePage.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <UserProfilePage />
      </Router>
    </UserProvider>
  </React.StrictMode>
);
