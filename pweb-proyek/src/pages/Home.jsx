import React from 'react';
import Content from '../components/Content';
import stars from '../images/stars.jpg';

const Home = () => (
  <div className="min-h-screen flex items-center justify-center relative">
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${stars})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    />
    <div className="relative z-10 w-full">
      <Content />
    </div>
  </div>
);

export default Home;
