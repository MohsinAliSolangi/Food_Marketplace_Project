import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

import FoodTraceabilityContractAddress from "./contractsData/FoodTraceabilityContract-address.json";
import FoodTraceabilityContract from "./contractsData/FoodTraceabilityContract.json";

import FoodTraceabilityMarketplaceAddress from "./contractsData/FoodTraceabilityMarketplace-address.json";
import FoodTraceabilityMarketplace from "./contractsData/FoodTraceabilityMarketplace.json";

import { ToastContainer, toast } from "react-toastify";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { formatEther } from "ethers/lib/utils";

export const Store = createContext();

const getMarketPalceInstance = async () => {
  const RPCURl = process.env.REACT_APP_RPC;
  const ethersProvider = new ethers.providers.Web3Provider(RPCURl);
  const FoodMarketplaceContract = new ethers.Contract(
    FoodTraceabilityMarketplaceAddress.address,
    FoodTraceabilityMarketplace.abi,
    ethersProvider
  );
  return FoodMarketplaceContract;
};

export const StoreProvider = ({ children }) => {
  const { address, isConnected } = useAppKitAccount();

  const { walletProvider } = useAppKitProvider("eip155");

  const [loader, setloader] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const [listedNftData, setListedNftData] = useState([]);

  // ////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////

  const GetIsUserRegistered = async () => {
    try {
      if (isConnected) {
        setloader(true);

        const ethersProvider = new ethers.providers.Web3Provider(
          walletProvider
        );

        const signer = ethersProvider.getSigner();

        const FoodMarketplaceContract = new ethers.Contract(
          FoodTraceabilityMarketplaceAddress.address,
          FoodTraceabilityMarketplace.abi,
          signer
        );

        const IsRegistered = await FoodMarketplaceContract.isUser(address);
        console.log(IsRegistered, "IsRegistered`1");
        setloader(false);
        return IsRegistered;
      }
    } catch (error) {
      setloader(false);
      console.log(error);
    }
  };

  const registerNewUser = async (data) => {
    try {
      setloader(true);

      if (!walletProvider) {
        throw new Error("Wallet provider is not defined.");
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);

      const signer = ethersProvider.getSigner();

      const FoodMarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      const regis = await FoodMarketplaceContract.registerAsUser(
        data?.name,
        data?.email,
        data?.phone_number,
        data?.role
      );
      regis.wait();
      await GetIsUserRegistered();
      setloader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const mintThenList = async (price, deadline, jsonUrl) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      const NFTContract = new ethers.Contract(
        FoodTraceabilityContractAddress.address,
        FoodTraceabilityContract.abi,
        signer
      );

      const minting = await NFTContract.mint(jsonUrl);
      await minting.wait();

      let amountInWei = ethers.utils.parseEther(price?.toString());

      const tokenId = await NFTContract.tokenCount();

      // let nftApprove = await NFTContract.setApprovalForAll(
      //     FoodTraceabilityMarketplaceAddress.address,
      //     true
      //   );
      // await nftApprove.wait();

      let nftApprove = await NFTContract.approve(
        FoodTraceabilityMarketplaceAddress.address,
        tokenId?.toString()
      );

      await nftApprove.wait();

      const listOnAuction = await MarketplaceContract.createAuction(
        FoodTraceabilityContractAddress?.address,
        tokenId?.toString(),
        amountInWei,
        deadline
      );
      await listOnAuction.wait();
    } catch (error) {
      setloader(false);
      toast.error(`${JSON.stringify(error.reason)}`);
      console.log(error);
    }
  };

  const loadMarketplaceItems = async () => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      const NFTContract = new ethers.Contract(
        FoodTraceabilityContractAddress.address,
        FoodTraceabilityContract.abi,
        signer
      );

      const itemCount = await MarketplaceContract?.ListdItems();

      let items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await MarketplaceContract?.listing(
          FoodTraceabilityContractAddress.address,
          i
        );

        if (!item?.sale) {
          const auction = await MarketplaceContract?._auctionDetail(
            FoodTraceabilityContractAddress.address,
            i
          );

          const time = await MarketplaceContract?.getLastTime(
            FoodTraceabilityContractAddress.address,
            i
          );

          const temp = Number(time?.toString());

          const uri = await NFTContract?.tokenURI(i);

          const response = await fetch(uri);
          const metadata = await response.json();
          console.log(metadata,"metadatametadata");
          console.log(auction,"auctionauctionauction");
          items.push({
            time: temp,
            basePrice: formatEther(item?.price?.toString()),
            itemId: i,
            seller: item?.seller,
            name: metadata?.name?.toString(),
            description: metadata?.description,
            image: metadata?.image,
            weight: metadata?.attributes[2]?.value,
            variety:metadata?.attributes[0]?.value,
            origin:metadata?.attributes[1]?.value,
            highestBid: formatEther(auction?.highestBid?.toString()),
            highestBidder: auction?.highestBidder,
            isAuctionEnded: auction?.ended,
          });
        }
      }
      console.log(items,"itemsitemsitems");
      setListedNftData(items);
      return true
    } catch (error) {
      console.log(error, "GetListedError");
      return false
    }
  };

  const cancelListedNft = async (itemId) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );
      setloader(true);
      await (await MarketplaceContract.cancelListing(itemId)).wait();
      setloader(false);
    } catch (error) {
      setloader(false);
      console.log(error);
    }
  };

  const concludeAuction = async (itemId) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );
      setloader(true);
      await (await MarketplaceContract.concludeAuction(itemId, address)).wait();
      setloader(false);
    } catch (error) {
      setloader(false);
      console.log(error);
    }
  };

  const cancellAuction = async (itemId) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );
      setloader(true);
      await (await MarketplaceContract.cancellAuction(itemId, address)).wait();
      setloader(false);
    } catch (error) {
      setloader(false);
      console.log(error);
    }
  };

  const buyMarketItem = async (itemId, totalPrice) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );
      setloader(true);
      await (
        await MarketplaceContract.purchaseItem(itemId, {
          value: totalPrice,
        })
      ).wait();
      setloader(false);
    } catch (error) {
      console.log(error);
      setloader(false);
    }
  };

  const placeBid = async (itemId, price) => {
    if (!isConnected) {
      return toast.error("Please Connect Your Wallet."), setloader(false);
    }
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const MarketplaceContract = new ethers.Contract(
        FoodTraceabilityMarketplaceAddress.address,
        FoodTraceabilityMarketplace.abi,
        signer
      );

      setloader(true);
      const bidding = ethers.utils.parseEther(price);
      console.log(FoodTraceabilityContractAddress.address,itemId,bidding?.toString());
      await (await MarketplaceContract.bid(FoodTraceabilityContractAddress.address,itemId,{value:bidding?.toString()})).wait();
      setloader(false);
      return true
    } catch (error) {
      setloader(false);
      console.log(error);
      return false
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////// GET FUNCTIONS /////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  const getLastTime = async (itemId) => {
    try {
      const time = await getMarketPalceInstance().getLastTime(itemId);
      const temp = Number(time.toString());
      const nowDate = Math.floor(new Date().getTime() / 1000);
      return temp;
    } catch (error) {
      console.log(error);
    }
  };

  const getHigestBid = async (itemId) => {
    try {
      let bid = await getMarketPalceInstance().getHighestBid(itemId);
      return ethers.utils.formatEther(bid);
    } catch (error) {
      console.log(error);
    }
  };

  const getHigestBidder = async (itemId) => {
    try {
      let bidder = await getMarketPalceInstance().getHighestBidder(itemId);
      return bidder;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Store.Provider
        value={{
          isRegistered,
          GetIsUserRegistered,
          registerNewUser,
          mintThenList,
          loadMarketplaceItems,
          listedNftData,
          cancelListedNft,
          concludeAuction,
          cancellAuction,
          buyMarketItem,
          placeBid,
          getLastTime,
          getHigestBid,
          getHigestBidder,
        }}
      >
        {children}
      </Store.Provider>
    </>
  );
};
