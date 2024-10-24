import React, { useEffect } from "react";
import NavComp from "../components/NavComp";
import ProductComponent from "../components/ProductComponent";
import { useNavigate } from "react-router-dom";
import { useAppKitAccount, useAppKitProvider, useWalletInfo } from "@reown/appkit/react";

function Home() {
  const data = [
    {
      id: "1",
      name: "Apple",
      variety: "Fuji",
      origin: "USA",
      currentPrice: 1.2,
      minimumBidIncrement: 0.05,
      biddingDeadline: "2024-03-15T14:00:00.000Z",
      quantityAvailable: 100,
      bidTime: "2024-03-14T14:00:00.000Z",
      farmerId: "FARMER_1",
      farmerName: "John Doe",
      image:
        "https://naturals.pk/cdn/shop/products/apple-kalakulu.jpg?v=1593218784",
    },
    {
      id: "2",
      name: "Banana",
      variety: "Cavendish",
      origin: "Ecuador",
      currentPrice: 0.5,
      minimumBidIncrement: 0.02,
      biddingDeadline: "2024-03-20T14:00:00.000Z",
      quantityAvailable: 200,
      bidTime: "2024-03-19T14:00:00.000Z",
      farmerId: "FARMER_2",
      farmerName: "Jane Smith",
      image:
        "https://naturals.pk/cdn/shop/products/apple-kalakulu.jpg?v=1593218784",
    },
    {
      id: "3",
      name: "Orange",
      variety: "Navel",
      origin: "Spain",
      currentPrice: 0.8,
      minimumBidIncrement: 0.03,
      biddingDeadline: "2024-03-25T14:00:00.000Z",
      quantityAvailable: 150,
      bidTime: "2024-03-24T14:00:00.000Z",
      farmerId: "FARMER_3",
      farmerName: "Bob Johnson",
      image:
        "https://naturals.pk/cdn/shop/products/apple-kalakulu.jpg?v=1593218784",
    },
  ];
  const { walletInfo } = useWalletInfo();

  console.log(walletInfo,"walletInfowalletInfowalletInfo");
  
  const { address, isConnected, chain } = useAppKitAccount();


  let nevigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      nevigate("/");
    }
    
  }, [address,isConnected]);

  return (
    <>
      <NavComp />
      <ProductComponent data={data} />
    </>
  );
}

export default Home;
