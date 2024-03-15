import React, { useState } from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState(''); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data to server:", { name, email, comment });
      const response = await fetch('http://127.0.0.1:5000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, comment }), 
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };



  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-y-auto">
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-screen-md md:flex md:mx-auto">
        {/* Left Section (Location and Contacts) */}
        <div className="md:w-1/2 pr-4 bg-white bg-opacity-90">
          <h1 className="text-2xl font-semibold mb-4 text-black">Contact Us</h1>

          {/* Location */}
          <div className="mb-4">
            <h2 className="text-lg font-medium text-black">Location</h2>
            <a
              href="https://www.google.com/search?q=Nyeri+Mall%2C+HXF4%2BW94%2C+Nyeri&oq=Nyeri+Mall%2C+HXF4%2BW94%2C+Nyeri&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABiABBiiBDIKCAIQABiABBiiBNIBCTI2NDhqMGoxNagCALACAA&sourceid=chrome&ie=UTF-8#rlimm=4961678308449667040"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Dawa Mall Gagere Rd Nyeri
            </a>
          </div>

          {/* Support Contacts */}
          <div className="mb-4">
            <h2 className="text-lg font-medium text-black">Support</h2>
            <p>Email: dawa.com</p>
            <p>Phone: 0741409419</p>
          </div>

          {/* Admission Contacts */}
          <div className="mb-4">
            <h2 className="text-lg font-medium text-black">Management</h2>
            <p>Email: infodawa@gmail.com</p>
            <p>Phone: 0741409419</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/dawa/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl text-blue-600 cursor-pointer" />
            </a>
            <a href="https://www.facebook.com/dawa/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl text-blue-800 cursor-pointer" />
            </a>
            <a href="https://twitter.com/dawa/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl text-blue-400 cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Right Section (Contact Form) */}
        <div className="md:w-1/2 bg-white bg-opacity-90">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 text-black">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 text-black">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 text-black">
                  Message
                </label>
                <textarea
                  type="text"
                  id="message"
                  className="mt-1 p-2 w-full border rounded-md"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button type="submit"  className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Submit
              </button>
            </form>
          ) : (
            <p className="text-green-500">Message Recieved!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
