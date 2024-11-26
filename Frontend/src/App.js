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
import { useContext, useEffect } from "react";
import { Store } from "./Store/Store";
import Loader from "./Models/Loader";

function App() {
  const { GetIsUserRegistered, setCanCall, loader, isRegistered } = useContext(Store);

  const nevigate = useNavigate();

  const { address, isConnected } = useAppKitAccount();

  const HandleIsUserRegister = async () => {
    console.log(isRegistered,"IsRegisteredIsRegistered");
    if (isConnected) {
      if (!isRegistered) {
        nevigate("/signUp");
      } else {
        nevigate("/marketplace");
      }
    } else {
      nevigate("/");
    }
  };

//   canCall
// setCanCall
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetIsUserRegistered();
        if (result) {
          setCanCall(true);
        }
      } catch (error) {
        console.error("Error in GetIsUserRegistered:", error);
      }
    };

    fetchData();
  }, [address]);

  return (
    <>
      {loader && <Loader />}
      <Routes>
        {/* wallet connect */}
        <Route
          path="/"
          element={
            <WalletConnect HandleIsUserRegister={HandleIsUserRegister} />
          }
        />

        {/* upload */}
        <Route
          path="/list"
          element={<Uploadpage HandleIsUserRegister={HandleIsUserRegister} />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route
          path="/signup"
          element={<Signup HandleIsUserRegister={HandleIsUserRegister} />}
        />
        <Route path="/login" element={<Login />} />

        {/* selling */}
        <Route path="/purchase-history" element={<Dashboard />} />

        {/* marketplace
         */}
        <Route
          path="/marketplace"
          element={<Home HandleIsUserRegister={HandleIsUserRegister} />}
        />
        <Route
          path="marketplace/bid/:id"
          element={<BidPage HandleIsUserRegister={HandleIsUserRegister} />}
        />

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
