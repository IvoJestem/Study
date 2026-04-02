import ReactDOM from "react-dom/client";
import { UserProvider } from "../../contexts/UserContext.tsx";
import AdminPanel from "./AdminPanel.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <AdminPanel />
  </UserProvider>
);
