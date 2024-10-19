import React from 'react';

// Component to display listed products
function ListedProducts({ listings }) {
  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">My Listed Products</h2>
      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-lg border border-gray-300">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-200">
                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase border-b border-gray-300">
                  Product
                </th>
                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase border-b border-gray-300">
                  Farmer
                </th>
                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase border-b border-gray-300">
                  Quantity
                </th>
                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase border-b border-gray-300">
                  Current Price
                </th>
                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase border-b border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 transition duration-200">
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-300">
                    <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-300">
                    <p className="text-gray-900 whitespace-no-wrap">{item.farmerName}</p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-300">
                    <p className="text-gray-900 whitespace-no-wrap">{item.quantityAvailable} kg</p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-300">
                    <p className="text-gray-900 whitespace-no-wrap">${item.currentPrice}</p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-300">
                    <button className="px-3 py-2 text-xs font-bold text-white uppercase bg-gray-800 rounded shadow hover:bg-gray-700 transition duration-200">
                      Edit Listing
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListedProducts;