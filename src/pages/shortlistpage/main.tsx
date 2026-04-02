import ReactDOM from "react-dom/client";
import { UserProvider } from "../../contexts/UserContext.tsx";
import ShortlistPage from "./ShortlistPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <ShortlistPage />
  </UserProvider>
);
