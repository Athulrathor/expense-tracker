import React, { useState } from 'react';

// Components
import Navbar from '../components/landingPages/Navbar';
import MainContent from '../components/landingPages/MainContent';
import Footer from '../components/landingPages/Footer';
import Login from '../authentications/Login';
import SignUp from '../authentications/SignUp';

// Assents
import logo from '../assets/logo.svg';

const LandingPage = () => {

  const [login,setLogin] = useState(false);
  const [signUp,setSignUp] = useState(false);

  if (login === true) return <Login setLogin={setLogin} />;

  if (signUp === true) return <SignUp setSignUp={setSignUp} />;

  return (
    <div className='w-full'>
      <div className='max-w-7xl mx-auto'>
        {/* Navbar */}
        <Navbar logo={logo} setLogin={setLogin} setSignUp={setSignUp} />
        {/* Main Content */}
        <MainContent setLogin={setLogin}/>
      </div>
      {/* Footer */}
      <div>
        <Footer logo={logo} />
      </div>
    </div>
  )
}

export default LandingPage;