import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

import Login from "./pages/Login";
import Uploadpage from "./pages/Uploadpage";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import BidPage from "./pages/BidPage";
import WalletConnect from "./pages/WalletConnect";


function App() {
  return (
    <>
        <Routes>
          
          {/* wallet connect */}
          <Route path="/" element={<WalletConnect />} />

          {/* upload */}
          <Route path="/list" element={<Uploadpage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* selling */}
          <Route path="/purchase-history" element={<Dashboard />} />

          {/* marketplace
           */}
          <Route path="/marketplace" element={<Home />} />
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
