import React from "react";
import { createRoot } from "react-dom/client";
import "../../../../../content/site/sv-gold-icons.js";
import "../../../../../content/site/sunnyvaile-directory.js";
import "../../../../../content/site/sv-global-header.js";
import "../../../../../content/site/sv-nav-auth.js";
import { App } from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
