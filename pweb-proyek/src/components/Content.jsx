import React from "react";
import profileImage from '../images/galaxy.png';
import { FaLinkedin, FaGithub, FaEnvelope, FaCode, FaGraduationCap, FaBriefcase, FaHeart } from 'react-icons/fa';

const Content = () => {
  const socialLinks = [
    { icon: <FaLinkedin size={24} />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaGithub size={24} />, url: "https://github.com/irfanapriansyah27", label: "GitHub" },
    { icon: <FaEnvelope size={24} />, url: "mailto:irfanapriansyah@gunadarma.ac.id", label: "Email" }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full bg-black/40 backdrop-blur-lg rounded-xl p-6 md:p-8 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10 hover:shadow-[0_0_25px_rgba(96,165,250,0.2)] transition-all duration-300">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Profile Section with enhanced animations */}
          <div className="flex flex-col items-center space-y-4 md:col-span-1" data-aos="fade-right">
            <div className="group relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.5)] transform transition-all duration-300 group-hover:scale-105">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-300">
              Irfan Apriansyah
            </h2>
            
            <p className="text-blue-200 text-center text-sm md:text-base">
              Barbeque and Chile | Hubris | Plaything
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Main Content with interactive sections */}
          <div className="md:col-span-2 space-y-6">
            {/* About Me Section */}
            <section className="group bg-black/30 p-6 rounded-lg transform transition-all duration-300 hover:bg-black/40 hover:shadow-lg hover:-translate-y-1" data-aos="fade-up">
              <div className="flex items-center space-x-3 mb-4">
                <FaCode className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Siapa saya ?</h3>
              </div>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                A too Z
                Seseorang yang menyukai kalimat "A to Z" cenderung memiliki minat yang luas dan menyukai hal-hal yang lengkap atau menyeluruh. 
                Mereka mungkin menghargai segala sesuatu yang mencakup seluruh aspek dari suatu topik atau konsep, 
                dari yang paling dasar (A) hingga yang paling kompleks (Z)
              </p>
            </section>

            {/* Education Section */}
            <section className="group bg-black/30 p-6 rounded-lg transform transition-all duration-300 hover:bg-black/40 hover:shadow-lg hover:-translate-y-1" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center space-x-3 mb-4">
                <FaGraduationCap className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Education</h3>
              </div>
              <ul className="list-none space-y-3">
                {[
                  { degree: "Gunadarma University", school: "Gunadarma", year: "2022 - Now" },
                ].map((edu, index) => (
                  <li key={index} className="group/item flex flex-col hover:bg-blue-900/20 p-2 rounded-lg transition-all duration-300">
                    <span className="font-medium text-blue-300">{edu.degree}</span>
                    <span className="text-sm text-gray-400">{edu.school} • {edu.year}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Interests Section */}
            <section className="group bg-black/30 p-6 rounded-lg transform transition-all duration-300 hover:bg-black/40 hover:shadow-lg hover:-translate-y-1" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-center space-x-3 mb-4">
                <FaHeart className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Tertarik</h3>
              </div>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                Play With Your Food
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Content;
