
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password,
      });

      const { username, role, user_id, access_token, refresh_token} = response.data;

      if (rememberMe) {
        // Store login credentials in localStorage
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        // Clear login credentials from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      const userrole = localStorage.getItem('role')
      if (userrole === 'admin') {
        navigate('/adminprofile'); // Redirect to admin profile for default admin
      } else {
        navigate('/userprofile'); // Redirect to user profile for regular users
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  // Function to handle the change in the "Remember Me" checkbox
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Function to retrieve stored login credentials from localStorage, if available
  const retrieveStoredCredentials = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  };

  // Call the function to retrieve stored credentials when the component mounts
  useEffect(() => {
    retrieveStoredCredentials();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl mb-4 text-center font-bold">Log In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input 
            type='checkbox'
            className='absolute top-2 right-2'
            onChange={() => setShowPassword(!showPassword)}
            />
          <label className='text-sm text-gray-600 absolute top-2 right-8 cursor-pointer'>
            { showPassword ? 'Hide password' : 'Show password'}
          </label>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="rememberMe" className="text-sm font-medium text-gray-600">
            Remember Me
          </label>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            className="ml-2 focus:ring-blue-300"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Log In
        </button>
        <p>Dont have an account?</p><Link to="/signup" className='text-center mt-4 text-sm text-blue-600 hover:underline'>Sign up</Link>
        <Link to="/resetpassword" className="block text-center mt-4 text-sm text-blue-600 hover:underline">Forgot password?</Link>
      </div>
    </div>
  );
};

export default Login;
