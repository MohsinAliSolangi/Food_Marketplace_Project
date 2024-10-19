// src/BidComponent.js
import React, { useState } from 'react';

const BidComponent = ({ product }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState({});

    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentPrice = product.currentPrice;

        // Validate bid amount
        if (parseFloat(bidAmount) <= currentPrice) {
            setMessage(`Your bid must be higher than the current price of $${currentPrice}.`);
            return;
        }

        // Add to cart
        const newCart = { ...cart };
        if (!newCart[product.id]) {
            newCart[product.id] = {
                product: product,
                quantity: 1,
                bidAmount: parseFloat(bidAmount),
            };
        } else {
            newCart[product.id].quantity += 1;
            newCart[product.id].bidAmount = parseFloat(bidAmount);
        }
        setCart(newCart);
        setMessage(`Bid of $${bidAmount} placed successfully!`);
        setBidAmount('');
    };

    const handleRemoveFromCart = (productId) => {
        const newCart = { ...cart };
        delete newCart[productId];
        setCart(newCart);
    };

    return (
        <div className="max-w-lg bg-white mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Place Your Bid</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold">{product.name} ({product.variety})</h2>
                <p className="text-gray-700"><strong>Origin:</strong> {product.origin}</p>
                <p className="text-gray-700"><strong>Current Price:</strong> ${product.currentPrice.toFixed(2)}</p>
                <p className="text-gray-700"><strong>Minimum Bid Increment:</strong> ${product.minimumBidIncrement.toFixed(2)}</p>
                <p className="text-gray-700"><strong>Bidding Deadline:</strong> {new Date(product.biddingDeadline).toLocaleString()}</p>
                <p className="text-gray-600">{product.description}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='py-3'>
                    <label className="block text-sm font-medium text-gray-700">
                        Your Bid Amount:
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={handleBidChange}
                            step={product.minimumBidIncrement}
                            min={product.currentPrice + product.minimumBidIncrement}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </label>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition duration-200">Place Bid</button>
            </form>
            {message && <p className="text-green-500">{message}</p>}
            
            <ul>
                {Object.keys(cart).map((productId) => (
                    <li key={productId} className="flex justify-between mb-4">
                        <span>{cart[productId].product.name} x {cart[productId].quantity}</span>
                        <span>Bid Amount: ${cart[productId].bidAmount.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BidComponent;