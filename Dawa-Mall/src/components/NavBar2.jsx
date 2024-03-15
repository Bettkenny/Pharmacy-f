import React from 'react'
import logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";


const NavBar2 = () => {
  const navigate = useNavigate()

  const onLogout = () => {
      
    localStorage.clear()
    navigate ('/login')
  }
  return (
    <nav className='py-4 px-6 lg:px-16 flex justify-between items-center bg-white-100 shadow-md w-full'>
      <div className="flex items-center">
        <Link to='/home2'>
          <img
            src={logo}
            alt="Logo"
            className="cursor-pointer h-10 w-auto"
          />
        </Link>
      </div>
      <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-bold hidden">
        <ul className="flex gap-8 mr-16 text-[18px]">
          <Link to='/home2'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/pharmacy'>
            <li>Pharmacy</li>
          </Link>
          <Link to='/check-drugs'>
            <li>Check Drugs</li>
          </Link>
          <Link to='/contact'>
            <li>Contact</li>
          </Link>
          
          <Link to='/login'>
            <button onClick = {onLogout} className='border-4 border-orange-600 font-medium text-black-600 text-lg px-4 w-auto py-1 rounded-lg'>LogOut</button>
          </Link>

        </ul>
       </div>
    </nav>
  )
}

export default NavBar2