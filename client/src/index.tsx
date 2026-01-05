import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PreferencesContextProvider } from "./contexts/PreferencesContext";
import { BrowserRouter, Routes, Route } from "react-router";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PreferencesContextProvider>
      {/*
      <App />
      */}
      <BrowserRouter>
        <Routes>
          <Route path="/" action element={<App />} />
          <Route path="pokemon/:pokeId/" element={<App />} />
          <Route path="*" element={<div>Error 404</div>} />
        </Routes>
      </BrowserRouter>
    </PreferencesContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
