import ReactDOM from "react-dom/client";

import UserProfilePage from "./UserProfilePage.tsx";
import { UserProvider } from "../../contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <UserProfilePage />
  </UserProvider>
);
