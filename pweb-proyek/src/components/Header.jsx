import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/images2.jpg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]">
              <img
                src={logo}
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Irfan Apriansyah</h1>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                ></path>
              </svg>
            </button>
          </div>

          <nav className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              {['Home', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-white text-lg hover:text-blue-400 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
