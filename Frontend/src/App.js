import "./App.css";
import { useState } from "react";
import React from "react";
import WalletConnect from "./Screens/WalletConnect";
import { Route, Routes, useLocation } from "react-router-dom";
import Marketplace from "./Screens/Marketplace";
import Header from "./Components/Header";
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Home from "./Screens/Home";
import BidPage from "./Screens/BidPage";
import UploadPage from "./Screens/UploadPage";

function App() {
  let location = useLocation();
  console.log(location, "locationlocation");
  return (
    <>
      {/* {location?.pathname != "/" && <Header />} */}
      <Routes>
        <Route path="/" element={<WalletConnect />} />
        <Route path="/marketplace" element={<Marketplace />} />
                  {/* upload */}
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* selling */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* marketplace
           */}
          <Route path="/home" element={<Home />} />
          <Route path="/bid" element={<BidPage />} />

          {/* about us 
      <Route path='/about' element={<about/>}/>
      */}

          {/* contact us 
      <Route path='/contact' element={<contact/>}/>
      */}
      </Routes>
    </>
  );
}

export default App;
