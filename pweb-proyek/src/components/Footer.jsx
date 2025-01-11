import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-blue-300 text-center py-6 border-t border-blue-400/20">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 transition-colors">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/irfanapriansyah27" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 transition-colors">
            <FaGithub size={24} />
          </a>
        </div>
        <p>© 2024 Irfan Apriansyah 50422717</p>
      </div>
    </footer>
  );
};

export default Footer;
