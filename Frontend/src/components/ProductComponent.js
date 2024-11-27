import React, { useContext } from "react";
import { Store } from "../Store/Store";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";

function ProductComponent() {
  const nevigate = useNavigate();
  const { address, isConnected } = useAppKitAccount();
  const {
    listedNftData,
    concludeAuction,
    cancelListedNft,
    buyMarketItem,
    userData,
  } = useContext(Store);

  const { role: userRole } = userData; // User role (e.g., "dealer", "farmer", etc.)

  console.log(userRole, "userRoleuserRoleuserRole");

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return "completed";
    } else {
      return (
        <span>
          {days}:{hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const canDisplayItem = (item) => {
    const sellerRole = item?.sallerRole;
    console.log(item, "sellerRolesellerRole");
    const allowedRoleCombinations = {
      Farmer: ["Dealer", "Farmer"],
      Dealer: ["Farmer", "Wholesaler"],
      Wholesaler: ["Dealer", "Farmer"],
      Seller: ["Buyer"],
      Buyer: ["Seller"],
    };
    return allowedRoleCombinations[sellerRole]?.includes(userRole);
  };

  return (
    <div className="flex flex-wrap justify-center mb-4">
      {listedNftData?.map((item, index) => {
        console.log(item, canDisplayItem(item), "canDisplayItem(item)");
        if (!canDisplayItem(item) || !item?.isListedOnSale) {
          return null;
        }

        return (
          <div key={index} className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg">
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {item?.name}
                </h1>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Farmer:</strong>{" "}
                    {`${item?.seller?.slice(0, 6)}...${item?.seller?.slice(
                      -6
                    )}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Origin:</strong> {item?.origin}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Weight:</strong> {item?.weight} kg
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Base Price:</strong> ETH
                    {item?.highestBid > 0
                      ? item?.highestBid?.toString()
                      : item?.basePrice?.toString()}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Bidding Deadline:</strong>{" "}
                    <Countdown date={item?.time * 1000} renderer={renderer} />
                  </p>
                  <button
                    onClick={() => nevigate(`bid/${item?.itemId}`)}
                    className="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded"
                  >
                   {`${address?.toLowerCase() === item?.seller?.toLowerCase() ? "Your NFT" :"Bid"}`}
                  </button>

                  {item?.highestBid > 0 &&
                    (address?.toLowerCase() ===
                      item?.highestBidder?.toLowerCase() ||
                      address?.toLowerCase() ===
                        item?.seller?.toLowerCase()) && (
                      <button
                        onClick={() => concludeAuction(item?.itemId)}
                        className="px-3 py-2 text-xs font-bold text-white uppercase bg-blue-600 rounded mt-2"
                      >
                        Conclude Auction
                      </button>
                    )}
                  {item?.isAuctionEnded &&
                    address?.toLowerCase() === item?.seller?.toLowerCase() && (
                      <button
                        onClick={() => cancelListedNft(item?.itemId)}
                        className="px-3 py-2 text-xs font-bold text-white uppercase bg-yellow-600 rounded mt-2"
                      >
                        Cancel Listing
                      </button>
                    )}

                  {userRole === "Buyer" && (
                    <button
                      onClick={() =>
                        buyMarketItem(item?.itemId, item?.basePrice)
                      }
                      className="px-3 py-2 text-xs font-bold text-white uppercase bg-green-600 rounded mt-2"
                    >
                      Buy Item
                    </button>
                  )}
                  {/* Action Buttons Ends */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductComponent;
