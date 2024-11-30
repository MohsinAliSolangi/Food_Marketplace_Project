import React, { useContext, useEffect } from "react";
import NavComp from "../components/NavComp";
import UploadForm from "../components/UploadeForm";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store/Store";
import { useAppKitAccount } from "@reown/appkit/react";

function Uploadpage() {
  const { mintThenList, canCall, HandleIsUserRegister } = useContext(Store);
  const { address, isConnected } = useAppKitAccount();

  const navigate = useNavigate();

  //TODO::uncommit this for production
  // const handleSubmit = async (product) => {
  //   console.log(product, "productproductproduct");

  //   if (typeof product?.image !== "undefined") {
  //     let resut
  //     try {
  //       resut = await uploadFileToIPFS(product?.image);
  //     } catch (error) {
  //       console.log("ipfs image fails",error);
  //     }

  //     const nftJSON = {
  //       attributes: [
  //         { trait_type: `Variety`, value: `${product?.variety}` },
  //         { trait_type: "Origin", value: `${product?.origin}` },
  //         { trait_type: "Weight", value: `${product?.weight}` },
  //       ],
  //       description: `${product?.description}`,
  //       image: `${resut?.pinataURL}`,
  //       name: `${product?.name}`,
  //     };

  //     try {
  //       const result = await uploadJSONToIPFS(nftJSON);
  //       console.log("this is json image format ", result);

  //       if (!product?.currentPrice || !product?.biddingDeadline || !result) return;

  //       await mintThenList(product?.currentPrice,product?.biddingDeadline,result);
  //       navigate("/marketplace");
  //     } catch (error) {
  //       console.log("ipfs uri upload error: ", error);
  //     }
  //   }
  // };

  const handleSubmit = async (product) => {
    console.log(product, "productproductproduct");
    try {
      const timestamp = convertToUnixTimestamp(product?.biddingDeadline);

      console.log(
        timestamp,
        "product?.biddingDeadlineproduct?.biddingDeadline"
      );

      await mintThenList(
        product?.currentPrice,
        timestamp,
        "https://ipfs.io/ipfs/QmeLfHUuJS1DYSvXmXP2vfZRCFhLF1wDUvUXFbPWQYMCna"
      );
      navigate("/marketplace");
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  function convertToUnixTimestamp(dateString) {
    const date = new Date(dateString);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
  }

  return (
    <>
      <NavComp />
        <UploadForm onSubmit={handleSubmit} />
      
    </>
  );
}

export default Uploadpage;
