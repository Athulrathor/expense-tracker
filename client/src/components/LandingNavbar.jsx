import React from 'react';
import logo from '../assets/logo.svg';

const LandingNavbar = () => {
  return (
    <div className='flex py-2 items-center justify-between'>
      {/* logo and name */}
      <div className='flex space-x-3 items-center '>
        {/* logo */}
        <img src={logo} alt='FlowFunds Logo' className='drop-shadow-lg' />
        <h1 className='font-bold text-2xl text-[#07bdbdff] text-shadow-lg'>FlowFunds</h1>
      </div>

      {/* optional providable nav links here */}

      {/* login and signup buttons */}
      <div className='space-x-3 max-sm:hidden'>
        <button className='font-bold px-3 py-2  rounded-3xl'>Login</button>
        <button className='font-bold px-3 py-2 bg-[#07bdbdff] border-2 border-[#07bdbd] rounded-3xl' >Signup</button>
      </div>
    </div>
  );
};

export default LandingNavbar;