import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SongProvider } from "./context/SongContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </UserProvider>
  </StrictMode>
);
