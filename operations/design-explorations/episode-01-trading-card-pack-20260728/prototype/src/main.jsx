import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";

async function start() {
  if(import.meta.env.DEV&&['localhost','127.0.0.1'].includes(location.hostname)&&new URLSearchParams(location.search).get('fixture')==='synthetic-episode-binder') {
    const {installBinderPreflight}=await import('../../../episode-01-three-tabs-one-task-20260727/prototype/src/binderPreflight.js');
    installBinderPreflight();
  }
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

}
start();
