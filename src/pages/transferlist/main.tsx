import ReactDOM from "react-dom/client";
import TransferList from "./TransferList.tsx";
import { UserProvider } from "../../contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <TransferList />
  </UserProvider>
);
