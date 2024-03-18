

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DrugCard = ({ id, image_url, pharmacy_name, drug_category, drug_name, quantity, description, status, price, handleBookClick, handleCardClick}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <li className="bg-white rounded-lg p-2 m-2 shadow-md flex flex-col items-center max-w-xs">
      <div className="w-full h-40 overflow-hidden rounded">
        <img src={image_url} alt="Room image" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-base font-bold mt-2">{pharmacy_name}</h2>
      <p className="text-black-600 text-m">{drug_category}</p>
      <p className="text-black-600 text-m">{drug_name}</p>
      <button
        className="mt-2 bg-blue-500 text-white rounded-md px-2 py-1 text-xs"
        onClick={toggleDetails}
      >
        {showDetails ? 'Less Details' : 'More Details'}
      </button>
      {showDetails && (
        <div className="p-4 text-sm">
          <p className="text-black-800 font-bold">Pharmacy Name: {pharmacy_name}</p>
          <p className="text-black-800 font-bold">Drug ID: {id}</p>
          <p className="text-black-800 font-bold">Drug Category: {drug_category}</p>
          <p className="text-black-800 font-bold">Drug Name: {drug_name}</p>
          <p className="text-black-800 font-bold">Quantity: {quantity}</p>
          <p className="text-black-800 font-bold">Description: {description}</p>
          <p className="text-black-800 font-bold">Price: Ksh{price}</p>
          {/* <Link to={`/rooms/${id}`}> */}
            {/* Update the link to match your route for individual room details */}
            <button onClick = {() => {handleBookClick; handleCardClick(id)}} className="mt-2 bg-green-500 text-white rounded-md px-2 py-1 text-xs">
              Buy Drug
            </button>
      {/*     </Link> */}
        </div>
      )}
    </li>
  );
};

export default DrugCard;



