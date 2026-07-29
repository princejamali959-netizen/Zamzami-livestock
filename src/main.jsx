import "./storage-shim.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./farm-ledger.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
