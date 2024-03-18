import React, { useState, useEffect } from 'react';
//import NavBar2 from './NavBar2';
import Layout2 from './Layout2';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaIdCard, FaEnvelope, FaPhone, FaCheckCircle } from 'react-icons/fa';


const UserProfile = () => {

  const [orders, setOrders] = useState([]);
  const [hasOrders, setHasOrders] = useState(false)
  const [userName, setUserName] = useState(''); 
  const [email, setEmail] = useState('');
  const[gender, setGender] = useState('');
  const[dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [userData, setUserData] = useState({})
  const [phoneNumber, setPhoneNumber] = useState('');
  const [payment, setPayment] = useState({});
  const [data, setData] = useState([]);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentCharges, setPaymentCharges] = useState('');
  const [orderToPay, setOrderToPay] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken')
  const username = localStorage.getItem('username');
  const user_id = localStorage.getItem('user_id');
  const role = localStorage.getItem('role');
  const headers = {'Authorization': `Bearer ${token}`};
  const [newEmail, setNewEmail] = useState('');
  const [newContact, setNewContact] = useState ('');
  const [newGender, setNewGender] = useState('');
  const [ newDateOfBirth, setNewDateOfBirth] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);
 
 

  
  //fetching profile data for a user
  useEffect(() => {
    const fetchUser = async () => {
        try {
          // Fetch orders for the user
          const profileData = await axios.get(`http://127.0.0.1:5000/register/${user_id}`, { headers: headers });
          setUserData(profileData.data);
                  
        } catch (error) {
        console.error("Error fetching user:", error);
        }
        
      };

    fetchUser();
    }, [user_id, headers]);


  //fetching orders for a particular user
   useEffect(() => {
    const fetchData = async () => {
        try {

          // Fetch orders for the user
          const ordersResponse = await axios.get(`http://127.0.0.1:5000/orders/${user_id}`, { headers: headers });
          /* console.log(ordersResponse.data.user_orders) */
          setOrders(ordersResponse.data.user_orders);
          setHasOrders(true);
        
        } catch (error) {
        // console.error("Error fetching data:", error);
        }
        
      };

    fetchData();
    }, [user_id, headers]);

// deleting a user by their id
 const deleteUser = async () => {
  try {
  const userToDelete = localStorage.getItem('user_id')
  if (!userToDelete) {
    console.error('User not found');
    return;
  }

  const response = await axios.delete(`http://127.0.0.1:5000/register/${user_id}`);

  // Handle success response if needed
  console.log('User deleted successfully:', response.data);

  // Clear order_id from localStorage after successful cancellation
  localStorage.clear()
  
  } catch (error) {
  console.error("Error deleting profile:", error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error message:", error.message);
  }
  }
  };

  const handleDeleteUser = () => {
 if (window.confirm('Are you sure you want to delete your profile? you will lose all data and order history')) {
  deleteUser();
  
 
  }
  };
  
    // function to select a order for edit, payment, and review
    const handleOrderClick = (orderId) => {
      const selected = orders.find((order) => order.id === orderId);
      setSelectedOrder(selected);
      if (selected){
        localStorage.setItem('order_id', selected.id)
        localStorage.setItem('drug_id', selected.drug_id)
        localStorage.setItem('quantity')
        localStorage.setItem('total_price', selected.total_price)
        orderId = localStorage.getItem('order_id')
     
      }
    }; 




   //toggling the button and content for update
    const toggleDetails = () => {
    setShowDetails((prevState) => !prevState)};


    // function to submit edited userprofile content
    const handleUpdateUser = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('accessToken');
  
      const updatedUserData = {
        username: newUserName,
        email: newEmail,
        contact: newContact,
        date_of_birth: newDateOfBirth,
        gender: newGender
      };
  
      try {
        const response = await axios.put(`http://127.0.0.1:5000/register/${user_id}`, updatedUserData, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        });
        
        console.log('Update response:', response.data);
        setSuccessMessage('Profile updated successfully');
        setShowDetails(false)
      } catch (error) {
        console.error("Error updating user profile:", error);
        setError('Failed to update profile');
      }
    };



    // function to cancel a order

    const cancelOrder = async () => {
    try {
    const order_id = localStorage.getItem('order_id')
    if (!order_id) {
      console.error('Order ID not found');
      return;
    }

    const response = await axios.delete(`http://127.0.0.1:5000/delete/${order_id}`);

    // Handle success response if needed
    console.log('order canceled successfully:', response.data);

    // Clear order_id from localStorage after successful cancellation
    localStorage.removeItem('order_id');
      
    navigate('/userprofile')

    
    } catch (error) {
    console.error("Error canceling the order:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    }
    };

    const handleOrderCancel = () => {
   if (window.confirm('Are you sure you want to cancel this order?')) {
    cancelOrder();
   
    }
    };

  
  const toggleReviewForm = () => {

    setShowReviewForm((prevState) => !prevState)};
    
  const handleReviewSubmit = async () => {
    const drug_id = localStorage.getItem('drug_id')
    
    const newReview = {
      user_id: user_id, 
      drug_id: drug_id,
      comment: reviewText
          
    };
    try {
      const response = await fetch('http://127.0.0.1:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const review = await response.json();
        console.log('Review posted:', review);
        alert('Thank you! We received your review and will implement.');
        setReviewText('');
        setShowReviewForm(false);
        setReviewSubmitSuccess(true);
      } else {
        console.error('Error posting review:', response.status);
        setError('Failed to post review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      setError('Failed to post review');
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    handleReviewSubmit();
  };

  

  const total_price = localStorage.getItem('total_price')

    
    const handlePayment = async (e)  => {
      e.preventDefault()
      const charges = 1
      const paymentDetail = {
        amount: charges,
        phone_number: phoneNumber
      };


      fetch('http://127.0.0.1:5000/lipa_na_mpesa', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetail)
      })
      .then(res=>res.json())
      .then((data)=>{
        // let newPaymentDetail = [... data,paymentDetail]
        setPayment(data)
        console.log(payment)
        setIsPayModalOpen(false);

        if (data.ResonseCode === 0 ){
          const paymentDetail = {
            amount: paymentCharges,
            order_id: orderToPay,
            user_id: user_id
          };
          console.log(paymentDetail)

          fetch('http://127.0.0.1:5000//callback_url', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentDetail)
          })
          .then(res=>res.json())
          .then((data) => {
            console.log(data)
            alert ("Payment Successfull")
          })
          
        }
        window.location.reload()

      })

    }




    return (
        <div className="container mx-auto mt-8 p-5">
          <Layout2 />
         
          <div className="flex flex-col lg:flex-row justify-between">
            {/* User Details */}
            <div className="space-y-4 lg:w-1/2">
              <div className="flex items-center space-x-2">
                <FaUserCircle className="w-5 h-5 text-gray-500" />
                <h1 className="text-lg font-semibold text-gray-800">Name: {userData.username}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <FaIdCard className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">ID: {userData.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">Email: {userData.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">Contact: {userData.contact}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">Status: {userData.role}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">Gender: {userData.gender}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">Date of Birth: {userData.date_of_birth}</p>
              </div>
              <div className="flex justify-center p-4 lg:justify-start mb-4">
                <button onClick={toggleDetails} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
                  {showDetails ? 'Cancel Edit' : 'Edit Profile'}
                </button>
                <button onClick= {() => handleDeleteUser()} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Delete Profile</button>
              </div>
      
              {/* Profile edit form */}
              {showDetails && (
                <div className="bg-gray-100 p-4 rounded-md">
                  <h2 className="text-xl font-semibold mb-4">Enter New Details</h2>
                  <form onSubmit={handleUpdateUser} className="space-y-4">
                    <div className="form-group">
                      <label htmlFor="usernameInput" className="block text-gray-600 font-bold mb-1">Username</label>
                      <input
                        type="text"
                        id="usernameInput"
                        name="username"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        className="input-field"
                        placeholder="New username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailInput" className="block text-gray-600 font-bold mb-1">Email</label>
                      <input
                        type="email"
                        id="emailInput"
                        name="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="input-field"
                        placeholder="New email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactInput" className="block text-gray-600 font-bold mb-1">Phone Number</label>
                      <input
                        type="text"
                        id="contactInput"
                        name="contact"
                        value={newContact}
                        onChange={(e) => setNewContact(e.target.value)}
                        className="input-field"
                        placeholder="New phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="genderInput" className="block text-gray-600 font-bold mb-1">Gender</label>
                      <input
                        type="text"
                        id="genderInput"
                        name="gender"
                        value={newGender}
                        onChange={(e) => setNewGender(e.target.value)}
                        className="input-field"
                        placeholder="New gender"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirthInput" className="block text-gray-600 font-bold mb-1">Date of Birth</label>
                      <input
                        type="date"
                        id="dateOfBirthInput"
                        name="date_of_birth"
                        value={newDateOfBirth}
                        onChange={(e) => setNewDateOfBirth(e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <button type="submit" className="w-full bg-orange-500 py-2 text-white font-medium rounded-md hover:bg-blue-600">Edit</button>
                  </form>
                </div>
              )}
            </div>
            
      
            {/* orders */}
            <div className="w-full lg:w-1/2 p-2">
              <h2 className="text-xl font-semibold mb-4">Orders</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-orange-400">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">drug Id</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancel</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders && orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-3 py-4 whitespace-nowrap">{order.drug_id}</td>
                        <td className="px-3 py-4 whitespace-nowrap">{order.quantity}</td>
                        <td className="px-3 py-4 whitespace-nowrap"><button onClick={() => { toggleReviewForm(); handleOrderClick(order.id) }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">Review</button></td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md" onClick={() => {setPaymentCharges(order.total_price); setOrderToPay(order.id); setIsPayModalOpen(true)}}>
                            Pay
                          </button>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap"><button onClick={() => {handleOrderClick(order.id); handleOrderCancel()}} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Cancel</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
    
                {showReviewForm && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="bg-gray-800 bg-opacity-75 w-full h-full absolute"></div>
                    <div className="bg-white rounded-lg p-8 z-50">
                      <h2 className="text-2xl font-semibold mb-4">Write us a Review</h2>
                      <h4 className="text-2xl font-semibold mb-4">We appreciate visiting our pharmacy</h4>
                      <form onSubmit={ submitReview} className="space-y-4">
                        <div className="form-group">
                          <label htmlFor="reviewText" className="block text-gray-600 font-bold mb-1">Review Text</label>
                          <textarea
                            id="reviewText"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full p-4 focus:outline-none focus:border focus:border-orange-500"
                            rows="10"
                            placeholder="Write your review here"
                          />
                        </div>
                        <button type="submit" className="w-full bg-orange-500 py-2 text-white font-medium rounded-md hover:bg-blue-600">Submit Review</button>
                      </form>
                    </div>
                  </div>
                )}
    
                { isPayModalOpen && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded">
                      <h3 className="text-xl font-bold mb-4">Payment</h3>
                      <form onSubmit={handlePayment}>
                        <div className="mb-2">
                          <label className="block text-sm font-bold mb-1" htmlFor="phone_number">
                            Total amount: Ksh{total_price}. Enter the phone number you wish to pay with:
                          </label>
                          <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="border rounded w-full py-2 px-3"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" 
                        >
                          Pay
                        </button>
                      </form>
                    </div>
                  </div>
                )}
    
              </div>
            </div>
          </div>
        </div>
      );
    
    }
    
    export default UserProfile;