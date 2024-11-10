import React, { useContext } from "react";
import BidComponent from "../components/BidComponent";
import { useParams } from "react-router-dom";

function BidPage() {
  const { id } = useParams();

  console.log(id);
  return (
    <>
      <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <BidComponent id={id} />
    </div>
    </>
  );
}

export default BidPage;
