import React from 'react'
import './App.css'
import SignUp from './components/Signup'
import Home from './components/Home';
function App(){
  return(
    <Routes>
    <Route path='/UserProfile' element={<UserProfile />} />
    <Route path='/' element={<Layout />}></Route>
    <Route path='/signup' element={<SignUp />} />
    <Route path='/home' element={<Home/>} />
    </Routes>

  );
}


export default App
