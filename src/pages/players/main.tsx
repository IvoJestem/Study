import ReactDOM from "react-dom/client";
import Players from "./Players.tsx";
import { UserProvider } from "../../contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <Players />
  </UserProvider>
);
