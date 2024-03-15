import React from 'react'
import NavBar2 from './NavBar2'
import { Outlet } from 'react-router-dom'

const Layout2 = () => {
  return (
    <div>
      <NavBar2/>
      <div className='container mx-auto mt-8 p-4'>
      <Outlet/>
      </div>
    </div>
  )
}

export default Layout2