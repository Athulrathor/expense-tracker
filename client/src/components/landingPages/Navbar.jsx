import React from 'react';
import { useState } from 'react';
import {Menu} from 'lucide-react';

const LandingNavbar = ({ logo,setLogin,setSignUp }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full border-b border-navy-100 bg-white">
      <div className="px-4 py-4 flex items-center justify-between">

        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2 select-none">
          <img src={logo} alt="FlowFunds Logo" className="w-8 h-8" />
          <span className="text-h4 font-bold text-navy-900">
            FlowFunds
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-body font-medium text-navy-500">
          <a href="/" className="hover:text-primary-500 transition">Home</a>
          <a href="#features" className="hover:text-primary-500 transition">Features</a>
          <a href="#pricing" className="hover:text-primary-500 transition">Pricing</a>
          <a href="#contact" className="hover:text-primary-500 transition">Contact</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={() => {setLogin(true)}} className="px-5 py-2 rounded-xl text-primary-600 font-semibold hover:bg-primary-50 transition">
            Login
          </button>
          <button onClick={() => {setSignUp(true)}} className="px-5 py-2 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-500 transition shadow-md">
            Sign up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-navy-100 transition"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile / Tablet Menu */}
      {open && (
        <div className="md:hidden border-t border-navy-100 bg-white px-4 py-6 space-y-4 animate-slide-down">
          <a href="#home" className="block text-body font-medium text-navy-700 hover:text-primary-500">
            Home
          </a>
          <a href="#features" className="block text-body font-medium text-navy-700 hover:text-primary-500">
            Features
          </a>
          <a href="#pricing" className="block text-body font-medium text-navy-700 hover:text-primary-500">
            Pricing
          </a>
          <a href="#contact" className="block text-body font-medium text-navy-700 hover:text-primary-500">
            Contact
          </a>

          <div className="pt-4 flex flex-col gap-3">
            <button onClick={() => {setLogin(true)}} className="w-full px-4 py-2 rounded-xl border border-primary-600 text-primary-600 font-semibold">
              Login
            </button>
            <button onClick={() => {setSignUp(true)}} className="w-full px-4 py-2 rounded-xl bg-primary-600 text-white font-semibold">
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;