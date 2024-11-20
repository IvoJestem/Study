import ReactDOM from "react-dom/client";

import { UserProvider } from "../../contexts/UserContext.tsx";
import NoAccess from "./NoAccess.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <NoAccess />
  </UserProvider>
);
