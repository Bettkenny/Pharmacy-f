import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PharmacyCard from './PharmacyCard'; // Corrected the case

const Pharmacy = () => {
  const [pharmacys, setPharmacys] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    try {
      fetch('http://127.0.0.1:5000/pharmacy')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPharmacys(data);
        })
        .catch(error => console.error('Error fetching pharmacy:', error));
    } catch (error) {
      console.error('Error in fetch:', error);
    }
  }, []);

  const handlePharmacyClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleClosePharmacy = () => {
    setSelectedPharmacy(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PHARMACYS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pharmacys.map(pharmacy => (
          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} onClick={handlePharmacyClick} /> // Corrected the case
        ))}
      </div>

      {selectedPharmacy && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src={selectedPharmacy.image_url} alt={selectedPharmacy.name} className="mb-4 w-full h-64 object-cover rounded-md" />
            <h2 className="text-2xl font-semibold mb-2">{selectedPharmacy.name}</h2>
            <p className="text-gray-600 mb-4">{selectedPharmacy.location}</p>
            <Link to='/browse-rooms'>
              <button onClick={handleClosePharmacy} className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none">See Rooms</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pharmacy;
