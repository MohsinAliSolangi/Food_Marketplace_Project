import React, { useContext } from 'react';
import { Store } from '../Store/Store';
import { useAppKitAccount } from '@reown/appkit/react';

// Component to display purchased items
function PurchaseList() {
  const { listedNftData, userData , listNftForSale } = useContext(Store);
  const { address, isConnected } = useAppKitAccount();

  const ownedUnlistedNfts = listedNftData?.filter(item => 
    item?.owner?.toLowerCase() === address?.toLowerCase() && !item?.isListedOnSale
  );

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">My Unlisted NFTs</h2>
      <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-lg border border-gray-300">
          {ownedUnlistedNfts?.length > 0 ? (
            <div className="flex flex-wrap justify-center mb-4">
              {ownedUnlistedNfts?.map((item, index) => (
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
                          <strong>Base Price:</strong> ETH
                          {item?.highestBid > 0
                            ? item?.highestBid?.toString()
                            : item?.basePrice?.toString()}
                        </p>
                      </div>
                      {/* Action Button: List NFT */}
                      <div className="mt-4">
                        <button
                          onClick={() => listNftForSale(item?.itemId)}
                          className="px-4 py-2 text-xs font-bold text-white uppercase bg-blue-600 rounded"
                        >
                          List NFT for Sale
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">You don't have any unlisted NFTs.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaseList;