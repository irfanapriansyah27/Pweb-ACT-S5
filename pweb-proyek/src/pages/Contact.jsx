import React, { useState } from 'react';
import { FaUser, FaIdCard, FaGraduationCap, FaBuilding } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    npm: '',
    nama: '',
    kelas: '',
    jurusan: ''
  });

  const BASE_URL = 'http://localhost/project1/axios';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact();
      setFormData({ npm: '', nama: '', kelas: '', jurusan: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const addContact = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/create.php`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = response.data;
      alert(data.success ? data.message : `Error: ${data.message}`);
    } catch (error) {
      console.error('Error adding contact:', error.response || error);
      alert(`Failed to add contact: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-transparent">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/20 shadow-[0_0_15px_rgba(96,165,250,0.2)]">
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Isi Formulir
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: 'npm', icon: <FaIdCard className="text-blue-400" /> },
            { name: 'nama', icon: <FaUser className="text-blue-400" /> },
            { name: 'kelas', icon: <FaGraduationCap className="text-blue-400" /> },
            { name: 'jurusan', icon: <FaBuilding className="text-blue-400" /> }
          ].map(({ name, icon }) => (
            <div key={name} className="relative">
              <label className="block text-sm font-medium capitalize mb-2 text-blue-300">
                {name}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  {icon}
                </span>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-blue-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-blue-300/50"
                  placeholder={`Masukkan ${name}`}
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-bold rounded-lg hover:from-blue-700/80 hover:to-purple-700/80 transform hover:-translate-y-0.5 transition-all duration-150 shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
