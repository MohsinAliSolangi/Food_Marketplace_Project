import React from 'react';
import NavComp from '../Components/NavComp';
import PurchaseList from '../Components/PurchaseList';
import ListedProducts from '../Components/ListedProduct';


function Dashboard() {
   const purchases = [
    {
      "id": "1",
      "name": "Apple",
      "farmerName": "John Doe",
      "quantityAvailable": 10,
      "currentPrice": 1.20
    },
    {
      "id": "2",
      "name": "Banana",
      "farmerName": "Jane Smith",
      "quantityAvailable": 5,
      "currentPrice": 0.50
    }
  ];

  const listings = [
    {
      "id": "3",
      "name": "Orange",
      "farmerName": "Bob Johnson",
      "quantityAvailable": 150,
      "currentPrice": 0.80
    },
    {
      "id": "4",
      "name": "Grapes",
      "farmerName": "Alice Brown",
      "quantityAvailable": 200,
      "currentPrice": 2.00
    }
  ];
  return (
    <>
      <NavComp />
      {/* 
        not that important

      <div className="flex justify-center items-center my-4">
        <CardComponent />
      </div> */}

         <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">My Product Dashboard</h1>
      <PurchaseList purchases={purchases} />
      <ListedProducts listings={listings} />
    </div>
    </>
  );
}

export default Dashboard;