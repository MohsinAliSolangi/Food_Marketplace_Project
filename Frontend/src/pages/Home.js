import React from 'react'
import NavComp from '../components/NavComp'
import ProductComponent from '../components/ProductComponent';

function Home() {
      const data = [{
    "id": "1",
    "name": "Apple",
    "variety": "Fuji",
    "origin": "USA",
    "currentPrice": 1.20,
    "minimumBidIncrement": 0.05,
    "biddingDeadline": "2024-03-15T14:00:00.000Z",
    "quantityAvailable": 100,
    "bidTime": "2024-03-14T14:00:00.000Z",
    "farmerId": "FARMER_1",
    "farmerName": "John Doe",
    "image":"https://naturals.pk/cdn/shop/products/apple-kalakulu.jpg?v=1593218784"
  },
  {
    "id": "2",
    "name": "Banana",
    "variety": "Cavendish",
    "origin": "Ecuador",
    "currentPrice": 0.50,
    "minimumBidIncrement": 0.02,
    "biddingDeadline": "2024-03-20T14:00:00.000Z",
    "quantityAvailable": 200,
    "bidTime": "2024-03-19T14:00:00.000Z",
    "farmerId": "FARMER_2",
    "farmerName": "Jane Smith",
    "image":"https://naturals.pk/cdn/shop/products/apple-kalakulu.jpg?v=1593218784"

  },
  {
    "id": "3",
    "name": "Orange",
    "variety": "Navel",
    "origin": "Spain",
    "currentPrice": 0.80,
    "minimumBidIncrement": 0.03,
    "biddingDeadline": "2024-03-25T14:00:00.000Z",
    "quantityAvailable": 150,
    "bidTime": "2024-03-24T14:00:00.000Z",
    "farmerId": "FARMER_3",
    "farmerName": "Bob Johnson",
    "image":"https://naturals.pk/cdn/shop/products/apple-kalakulu.jpg?v=1593218784"

  },
];
  return (
    
    <>
    <NavComp/>
      <ProductComponent data={data}/>
    </>
  )
}

export default Home