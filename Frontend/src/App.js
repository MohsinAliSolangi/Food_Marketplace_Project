import "./App.css";
import { useState } from "react";
import React from "react";
import WalletConnect from "./Screens/WalletConnect";
import { Route, Routes, useLocation } from "react-router-dom";
import Marketplace from "./Screens/Marketplace";
import Header from "./Components/Header";

function App() {
  let location = useLocation();
  console.log(location, "locationlocation");
  return (
    <>
      {location?.pathname != "/" && <Header />}
      <Routes>
        <Route path="/" element={<WalletConnect />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </>
  );
}

export default App;
