

import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; 

const PharmacyCard = ({ pharmacy, onClick }) => (
  <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => onClick(pharmacy)}>
    <img src={pharmacy.image_url} alt={pharmacy.name} className="mb-4 w-full h-32 object-cover rounded-md" />
    <h2 className="text-xl font-semibold mb-2">{pharmacy.name}</h2>
    <div className="flex items-center mb-2">
      <FaMapMarkerAlt className="text-gray-500 mr-2" />
      <p className="text-gray-600">{pharmacy.location}</p>
    </div>
    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">See Drugs</button>
  </div>
);

export default PharmacyCard;

