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
      Dealer: ["Dealer", "Wholesaler"],
      Wholesaler: ["Wholesaler", "Seller"],
      Seller: ["Seller", "Buyer"],
      Buyer: ["Seller"],
    };
    return allowedRoleCombinations[sellerRole]?.includes(userRole);
  };

  const currentTime = Date.now();

  const timeAgo = (timestamp) => {
    const now = Date.now();
    const diffInMilliseconds = now - timestamp;

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return diffInMinutes === 1
        ? "1 minute ago"
        : `${diffInMinutes} minutes ago`;
    } else {
      return "Just now";
    }
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
                    <strong>Farmer Address:</strong>{" "}
                    {`${item?.farmer?.slice(0, 6)}...${item?.farmer?.slice(
                      -6
                    )}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Seller Address:</strong>{" "}
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
                    <strong>Height Bidder:</strong>{" "}
                    {`${item?.highestBidder?.slice(
                      0,
                      6
                    )}...${item?.highestBidder?.slice(-6)}`}
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
                    <strong>Seller Role:</strong> {item?.sallerRole}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Product Croping Time:</strong>{" "}
                    {timeAgo(item?.productCropTime * 1000)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Bidding Deadline:</strong>{" "}
                    <Countdown date={item?.time * 1000} renderer={renderer} />
                  </p>

                  <button
                    onClick={() => nevigate(`bid/${item?.itemId}`)}
                    className="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded"
                  >
                    {`${
                      address?.toLowerCase() === item?.seller?.toLowerCase()
                        ? "Your NFT"
                        : currentTime > item?.time * 1000
                        ? "Auction Ended"
                        : "Bid"
                    }`}
                  </button>
                  {currentTime > item?.time * 1000 &&
                    item?.highestBid > 0 &&
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

                {/* Sales History Section */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Sales History
                  </h3>
                  {console.log(item, "listedNftData?.purchaseHistory")}
                  {item?.purchaseHistory &&
                  item?.purchaseHistory?.length > 0 ? (
                    <div className="mt-2">
                      {item?.purchaseHistory?.map((purchase, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm text-gray-600"
                        >
                          <p>
                            <strong>Buyer:</strong>
                            {`${purchase?.buyer?.slice(
                              0,
                              6
                            )}....${purchase?.buyer?.slice(-6)}`}
                          </p>
                          <p>
                            <strong>Price:</strong> {purchase?.price} ETH
                          </p>
                          <p>
                            <strong>Timestamp:</strong> {purchase?.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      No sales history available.
                    </p>
                  )}
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
