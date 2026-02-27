import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { logWebVitals, sendWebVitalsToAnalytics } from "./shared/utils/webVitals";

// Iniciar monitoreo de Web Vitals
logWebVitals();
sendWebVitalsToAnalytics();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
