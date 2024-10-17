import { useAppKitAccount } from "@reown/appkit/react";
import React from "react";

const Marketplace = () => {
  const { address, isConnected } = useAppKitAccount();
  return (
    <div className="marketplace_main">
      <h1> Welcome to Marketplace</h1>
      UserAddress : {address}
    </div>
  );
};

export default Marketplace;
