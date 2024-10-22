import React, { useState } from 'react';

function UploadForm({ onSubmit }) {
  const [product, setProduct] = useState({
    id: Date.now(), // Unique ID based on timestamp
    name: '',
    variety: '',
    origin: '',
    currentPrice: '',
    minimumBidIncrement: '',
    biddingDeadline: '',
    description: '',
    weight: '', // New field for weight
    image: null, // New field for image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0], // Store the selected file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    // Reset form after submission
    setProduct({
      id: Date.now(),
      name: '',
      variety: '',
      origin: '',
      currentPrice: '',
      minimumBidIncrement: '',
      biddingDeadline: '',
      description: '',
      weight: '',
      image: null,
    });
  };

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">List Your Product</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="variety">
            Variety
          </label>
          <input
            type="text"
            name="variety"
            value={product.variety}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="origin">
            Origin
          </label>
          <input
            type="text"
            name="origin"
            value={product.origin}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPrice">
            Current Price ($)
          </label>
          <input
            type="number"
            name="currentPrice"
            value={product.currentPrice}
            onChange={handleChange}
            required
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minimumBidIncrement">
            Minimum Bid Increment ($)
          </label>
          <input
            type="number"
            name="minimumBidIncrement"
            value={product.minimumBidIncrement}
            onChange={handleChange}
            required
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray -700 text-sm font-bold mb-2" htmlFor="biddingDeadline">
            Bidding Deadline
          </label>
          <input
            type="datetime-local"
            name="biddingDeadline"
            value={product.biddingDeadline}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus :outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            required
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          List Product
        </button>
      </form>
    </div>
  );
}

export default UploadForm;