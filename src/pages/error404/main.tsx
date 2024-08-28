import ReactDOM from "react-dom/client";
import Error2137 from "./Error404.tsx";

import { UserProvider } from "../../contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <Error2137 />
  </UserProvider>
);
