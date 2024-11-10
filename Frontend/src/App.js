import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Uploadpage from "./pages/Uploadpage";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import BidPage from "./pages/BidPage";
import WalletConnect from "./pages/WalletConnect";
import { useAppKitAccount } from "@reown/appkit/react";
import { useContext } from "react";
import { Store } from "./Store/Store";

function App() {
  const { GetIsUserRegistered } = useContext(Store);

  const nevigate = useNavigate();

  const { address, isConnected } = useAppKitAccount();

  const isUserRegister = async () => {
    if (isConnected) {
      let isRegistered = await GetIsUserRegistered();
      console.log(isRegistered, "isRegisteredisRegistered");
      if (!isRegistered) {
        nevigate("/signUp");
      } else {
        nevigate("/marketplace");
      }
    } else {
      nevigate("/");
    }
  };

  return (
    <>
      <Routes>
        {/* wallet connect */}
        <Route
          path="/"
          element={<WalletConnect isUserRegister={isUserRegister} />}
        />

        {/* upload */}
        <Route path="/list" element={<Uploadpage />} />

        <Route path="/profile" element={<Profile />} />
        <Route
          path="/signup"
          element={<Signup isUserRegister={isUserRegister} />}
        />
        <Route path="/login" element={<Login />} />

        {/* selling */}
        <Route path="/purchase-history" element={<Dashboard />} />

        {/* marketplace
         */}
        <Route path="/marketplace" element={<Home />} />
        <Route path="marketplace/bid/:id" element={<BidPage />} />

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
