import axios from 'axios';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] =useState('');
    const [isSignupSuccess, setSignupSuccess] = useState('');
    const [showPassword, setShowPassword] = useState('false');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://127.0.0.1:5000/register', {
               username, email, contact, gender, date_of_birth, password,
        });
        
        alert("user register successfully.", response.data);
        setSignupSuccess(true)
        navigate("/login")

    }
    catch (error) {
        console.error('Error during signup', error)
    }
};

return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-center font-bold text-2xl mb-6'>Get Started</h2>
        <p className='text-center text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500'>
            Login
          </Link>
        </p>
        {error && <p className='text-red-500 my-2'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-600 font-bold mb-1'>Username</label>
            <input
              type='text'
              id='usernameInput'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Enter your username'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-600 font-bold mb-1'>Email</label>
            <input
              type='email'
              id='emailInput'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-600 font-bold mb-1'>Date of Birth</label>
            <input
              type='date'
              id='dateOfBirthInput'
              name='date_of_birth'
              value={DateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Enter your date of birth'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-600 font-bold mb-1'>Gender</label>
            <select
              id='genderSelect'
              name='gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
            >
              <option value='' disabled>
                Select your gender
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <div className='mb-4 relative'>
            <label className='block text-gray-600 font-bold mb-1'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='passwordInput'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Enter your password'
            />
            <input
              type='checkbox'
              className='absolute top-2 right-2'
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className='text-sm text-gray-600 absolute top-2 right-8 cursor-pointer'>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </label>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-600 font-bold mb-1'>Phone Number</label>
            <input
              type='text'
              id='contactInput'
              name='contact'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
              placeholder='Enter your phone number'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-orange-500 py-2 text-white font-medium rounded-md hover:bg-blue-600'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;