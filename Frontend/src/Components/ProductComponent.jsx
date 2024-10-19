import React from 'react';

// Define the ProductComponent that accepts props
function ProductComponent({ data }) {
  return (
    <div className="flex flex-wrap justify-center mb-4">
      {data.map((item, index) => (
        <div key={index} className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-white rounded-lg shadow-lg">
            <img 
              src={item.image} // Assuming item.image contains the image URL
              alt={item.name} // Alt text for accessibility
              className="w-full h-48 object-cover rounded-t-lg" // Styling for the image
            />
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600"><strong>Farmer:</strong> {item.farmerName}</p>
                <p className="text-sm text-gray-600"><strong>Origin:</strong> {item.origin}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600"><strong>Quantity:</strong> {item.quantityAvailable} kg</p>
                <p className="text-sm text-gray-600"><strong>Current Price:</strong> ${item.currentPrice}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-600"><strong>Bidding Deadline:</strong> {item.biddingDeadline}</p>
                <button className="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded">
                  Buy
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