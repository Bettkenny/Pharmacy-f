import React from "react";
import banner from './assets/banner.png'

const Hero = () => {
    return (
        <div className='pt-8'>
        <h1 className='text-6xl my-4 font-bold text-center'>We save a life every day</h1>
        
        <div style={{backgroundImage: `url(${banner})`}} className=' bg-cover relative overflow-hidden my-4 rounded-xl mx-16 h-[60vh]'>
          <div className='absolute top-0 right-0 w-full h-full bg-black bg-opacity-30'></div>
        </div>
    
        <div className='w-1/3 mx-auto my-8'>
          <h2 className='text-center font-medium italic text-lg'>"We cure but God heals. Get our services at affordable price"</h2>
        </div>
    
      </div>  )
    }
    
    export default Hero