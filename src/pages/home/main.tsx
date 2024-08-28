import ReactDOM from "react-dom/client";
import Home from "./Home.tsx";
import { UserProvider } from "../../contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <Home />
  </UserProvider>
);
