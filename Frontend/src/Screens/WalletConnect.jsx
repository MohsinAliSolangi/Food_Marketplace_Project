import React, { useEffect } from "react";
import image from "../assets/logo-light.ico";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
const WalletConnect = () => {
  // 4. Use modal hook
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider();

  let navigate = useNavigate();

  useEffect(() => {
    if(isConnected){
        navigate("/marketplace");
    }
  }, [address]);

  return (
    <>
    <div className="container">

    <div className="wrapper">
      <div className="icon">
        <img src={image} alt="Food Tracer" />
      </div>
      <div>
        <h1>Connect To Food Tracer</h1>
        <button onClick={() => open()}> Connect Wallet</button>
        <div className="register-link">
          <p>
            Don&#x27;t have an MetaMask?
            <a href="https://metamask.io/download/"> Download</a>
          </p>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default WalletConnect;
