import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3Modal } from "./Store/Web3Modal";
import { StoreProvider } from "./Store/Store";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Web3Modal>
    <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </StoreProvider>
  </Web3Modal>
);

reportWebVitals();
