import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import DrugCard from './DrugCard';
import Order from './Order';

function Drugs() {
  const [drugs, setDrugs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch("http://127.0.0.1:5000/drugs")
        .then((res) => res.json())
        .then((drugs) => {
          setDrugs(drugs);
          setFilteredData(drugs);
        })
        .catch((error) => {
          console.error("Failed to fetch data", error);
        });
    } catch (error) {
      console.error('Error in fetch:', error);
    }
  }, []);

  function handleSearch(e) {
    setSearchItem(e.target.value);
  }

  useEffect(() => {
    const filteredResults = drugs.filter((drug) =>
      drug.drug_name?.toLowerCase().includes(searchItem.toLowerCase()) ||
      drug.pharmacy_name?.toLowerCase().includes(searchItem.toLowerCase()) ||
      drug.drug_category?.toLowerCase().includes(searchItem.toLowerCase()) ||
      drug.id.toString().includes(searchItem.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [drugs, searchItem]);

  const handleCardClick = (drugId) => {
    const selected = drugs.find((drug) => drug.id === drugId);
    setSelectedDrug(selected);
    localStorage.setItem('drug_id', selected.id);
    localStorage.setItem('total_price', selected.price);
  };

  const removeDrugDetails = () => {
    localStorage.removeItem('drug_id');
    localStorage.removeItem('total_price');
  };

  const handleOrderClick = () => {
    const currentUser = localStorage.getItem('accessToken');
    if (currentUser) {
      setIsLoggedIn(true);
      // Navigate to drug details page with selected drug object
      navigate(`/drug-details/${selectedDrug.id}`);
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-wrap">
      <h1 className="text-3xl font-bold mb-4 w-full">These are Drugs available</h1>
      <Search handleSearch={handleSearch} searchItem={searchItem} /> 
      {filteredData.map((drug) => (
        <div key={drug.id}>
          <DrugCard
            id={drug.id}
            pharmacy_name={drug.pharmacy_name}
            drug_category={drug.drug_category}
            description={drug.description}
            image_url={drug.image_url}
            quantity={drug.quantity}
            price={drug.price}
            handleCardClick={() => handleCardClick(drug.id)}
            handleOrderClick={() => setSelectedDrug(drug)} // Set selected drug on order button click
            removeDrugDetails={removeDrugDetails}
          />
        </div>
      ))}
      {selectedDrug && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <button className="absolute top-0 right-0 m-4 text-xl cursor-pointer" onClick={() => { setSelectedDrug(null); removeDrugDetails(); }}>
              &#x2716;
            </button>
            {/* Reduced the size of the image by limiting its dimensions */}
            <img src={selectedDrug.image_url} alt="Drug image" id="selected-drug" className="w-full md:w-2/3 object-cover max-h-96" />
            <div className="p-4 md:w-2/3">
              <h2 className="text-2xl font-bold">{selectedDrug.pharmacy_name}</h2>
              <p className="text-gray-600">Drug ID: {selectedDrug.id}</p>
              <p className="text-gray-600 font-bold">Drug category: {selectedDrug.drug_category}</p>
              <p className="text-gray-600 font-bold">Description: {selectedDrug.description}</p>
              <p className="text-gray-600">Price: Ksh{selectedDrug.price}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleOrderClick}>
                Order
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isLoggedIn && showOrderModal && <Order onClose={handleCloseModal} />}
    </div>
  );
}

export default Drugs;
