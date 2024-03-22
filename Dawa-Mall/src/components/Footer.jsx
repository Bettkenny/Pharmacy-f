import React from 'react';
import { AiFillFacebook, AiFillTwitterSquare, AiOutlineMail, AiOutlineGlobal } from 'react-icons/ai';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className='footer bg-gray-700 text-white font-bold p-6'>
      <div className='flex justify-between items-center'>
        <p>© Copyright {currentYear}. <span>All Rights Reserved</span></p>
        <div className='footer-icons flex space-x-4'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><AiFillFacebook size={35} /></a>
          <a href="mailto:infordawa.com"><AiOutlineMail size={35} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={35} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><AiFillTwitterSquare size={35} /></a>
          <a href="https://dawa.com" target="_blank" rel="noopener noreferrer"><AiOutlineGlobal size={35} /></a>
        </div>
      </div>

      <div className='mt-4'>
        <div className='flex space-x-6'>
          <Link to='/about'>About</Link>
          <Link to='/pharmacy'>Pharmacys</Link>
          <Link to='/contact'>Contact</Link>
        </div>
        <div className='mt-2'>
          <p>Nyaribo Pharmacy</p>
          <p>P.O Box 28860 - 00100, Nyeri Kenya</p>
          <p>Email: infodawa.com</p>
          <p>Phone: 0741409419</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;