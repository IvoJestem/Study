import ReactDOM from "react-dom/client";
import Search from "./Search.tsx";
import { UserProvider } from "../../contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <Search />
  </UserProvider>
);
