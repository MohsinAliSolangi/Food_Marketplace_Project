import React, { useEffect } from "react";
import logoHeader from "../assets/headerLogo.png";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  let nevigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      nevigate("/");
    }
  }, [isConnected]);

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logoHeader} alt="logo" className="metaLogo" />
        </div>
        <div className="nav-buttons">
          <button>Marketplace</button>
          <button>Profile</button>
          <button>Listing</button>
        </div>
        <div className="connect-button">
          <button onClick={() => open({ view: "Account" })}>LogOut</button>
        </div>
      </div>
    </>
  );
};

export default Header;
