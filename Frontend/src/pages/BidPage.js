import React from "react";
import BidComponent from "../components/BidComponent";

const product = {
  id: "1",
  name: "Apple",
  variety: "Fuji",
  origin: "USA",
  currentPrice: 1.2,
  minimumBidIncrement: 0.05,
  biddingDeadline: "2024-03-15T14:00:00.000Z",
  description:
    "Fresh organic Fuji apples, known for their crisp texture and sweet flavor.",
};

function BidPage() {
  return (
    <>
      <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <BidComponent product={product} />
    </div>
    </>
  );
}

export default BidPage;
