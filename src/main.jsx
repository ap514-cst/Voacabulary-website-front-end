import { StrictMode } from "react";
import {hydrateRoot} from "react-dom/client"
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

hydrateRoot(
  rootElement,
  <StrictMode>
    <GoogleOAuthProvider
      clientId="946839756651-ee2qm7eft0f77hg522jpbgvhreoefbi5.apps.googleusercontent.com"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);