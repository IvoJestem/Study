import ReactDOM from "react-dom/client";
import Login from "./Login.tsx";
import { UserProvider } from "../../contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <Login />
  </UserProvider>
);
