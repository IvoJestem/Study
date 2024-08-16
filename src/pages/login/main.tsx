import ReactDOM from "react-dom/client";
import Login from "./Login.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);
