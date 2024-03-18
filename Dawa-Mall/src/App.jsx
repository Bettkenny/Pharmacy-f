import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home2 from './components/Home2';
import About from './components/About';
//import Hostel from './components/Hostel';
import SignUp from './components/Signup';
import Login from './components/Login';
import Layout from './components/Layout';
import Contact from './components/Contact';
import Drugs from './components/Drug';
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
          <Route path='/home2' element={<Home2 />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/check-drugs' element={<Drugs/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/signup' element={<SignUp />} />
          
          {/* Add a default route for the home page */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;