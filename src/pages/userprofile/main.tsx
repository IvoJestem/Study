import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile.tsx";
import { UserProvider } from "../../contexts/UserContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <UserProfile />
      </Router>
    </UserProvider>
  </React.StrictMode>
);
