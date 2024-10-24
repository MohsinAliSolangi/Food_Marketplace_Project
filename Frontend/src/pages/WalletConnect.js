import React, { useContext, useEffect } from "react";
import image from "../assets/logo-light.ico";
import { ethers } from "ethers";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store/Store";

const WalletConnect = ({isUserRegister}) => {
  // 4. Use modal hook
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  useEffect(() => {
    isUserRegister()
  }, [address, isConnected]);

  return (
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
  );
};

export default WalletConnect;
