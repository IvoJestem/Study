import ReactDOM from "react-dom/client";

import { UserProvider } from "../../contexts/UserContext.tsx";
import NotLoggedInPage from "./NotLoggedInPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <NotLoggedInPage />
  </UserProvider>
);
