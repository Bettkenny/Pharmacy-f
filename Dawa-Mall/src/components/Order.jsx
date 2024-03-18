import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Order = ({ onClose }) => {
  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get drug_id and user_id from local storage (assuming you have stored them there)
    const drug_id = localStorage.getItem('drug_id');
    const user_id = localStorage.getItem('user_id'); // Replace 'user_id' with your actual user ID key

    // Get total_price from local storage (assuming you have stored it there)
    const total_price = localStorage.getItem('total_price');

    // Construct the data object to be sent to the backend
    const data = {
      user_id: user_id,
      drug_id: drug_id,
      quantity: quantity, // Add quantity to the data object
      total_price: total_price,
    };

    // Add authorization token to headers
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/order', data, { headers: headers });
      
      if (response.data.message === "Order made successfully!") {
        navigate('/UserProfile');
        alert('Order successful. Proceed to pay');
      } else {
        alert('Could not complete your order. Check connection');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Parse input value to integer and update quantity state
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <button className="absolute top-0 right-0 m-4 text-xl cursor-pointer" onClick={onClose}>
          &#x2716;
        </button>
        {/* Add your booking content here */}
        <p>Thank you for trusting Nyaribo Pharmacy. Please indicate the quantity you need.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantity" className="block mt-4 text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Proceed to Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
