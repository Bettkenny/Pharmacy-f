import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
//import About from './components/About';
//import Hostel from './components/Hostel';
import SignUp from './components/Signup';
//import LogIn from './components/Login';
import Layout from './components/Layout';
import Contact from './components/Contact';
//import Rooms from './components/Rooms';
//import AdminProfile from './components/AdminProfile';
import UserProfile from './components/UserProfile';
//import Booking from './components/Booking';
//import HostelComp from './pages/HostelComp';
//import RoomComp from './pages/RoomComp';
//import BookingComp from './pages/BookingComp';
//import MessageComp from './pages/MessageComp';
//import ReviewComp from './pages/ReviewComp';
//import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       

        <Route path='/UserProfile' element={<UserProfile />} />

        <Route path='/' element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          
          <Route path='/signup' element={<SignUp />} />
          
          {/* Add a default route for the home page */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;