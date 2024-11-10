import React, { useContext } from "react";
import { Store } from "../Store/Store";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

function ProductComponent() {
  const nevigate = useNavigate();

  const { listedNftData, placeBid } = useContext(Store);

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

  return (
    <div className="flex flex-wrap justify-center mb-4">
      {listedNftData?.map((item, index) => (
        <div key={index} className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-white rounded-lg shadow-lg">
            <img
              src={item?.image}
              alt={item?.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-900">{item?.name}</h1>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600">
                  <strong>Farmer:</strong>{" "}
                  {`${item?.seller?.slice(0, 6)}...${item?.seller?.slice(-6)}`}
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
                  <strong>Current Price:</strong> ETH
                  {item?.highestBid > 0 ? item?.highestBid?.toString() : item?.basePrice?.toString()}
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
                  Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductComponent;
