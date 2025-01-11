import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import "aos/dist/aos.css";
import AOS from 'aos';
import stars from './images/stars.jpg';
import axios from 'axios';

function App() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ id: '', npm: '', nama: '', kelas: '', jurusan: '' });
  const [isEdit, setIsEdit] = useState(false);

  const BASE_URL = 'http://localhost/project1/axios';

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/read.php`);
      setMahasiswa(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addMahasiswa = async () => {
    try {
      await axios.post(`${BASE_URL}/create.php`, {
        npm: form.npm,
        nama: form.nama,
        kelas: form.kelas,
        jurusan: form.jurusan,
      });
      setForm({ id: '', npm: '', nama: '', kelas: '', jurusan: '' });
      fetchMahasiswa();
    } catch (error) {
      console.error('Error adding mahasiswa:', error);
    }
  };

  const updateMahasiswa = async () => {
    try {
      await axios.post(`${BASE_URL}/update.php`, form);
      setForm({ id: '', npm: '', nama: '', kelas: '', jurusan: '' });
      setIsEdit(false);
      fetchMahasiswa();
    } catch (error) {
      console.error('Error updating mahasiswa:', error);
    }
  };

  const deleteMahasiswa = async (id) => {
    try {
      await axios.post(`${BASE_URL}/delete.php`, { id });
      fetchMahasiswa();
    } catch (error) {
      console.error('Error deleting mahasiswa:', error);
    }
  };

  const handleEdit = (mahasiswa) => {
    setForm(mahasiswa);
    setIsEdit(true);
  };

  const handleAddContact = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${stars})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-20">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    mahasiswa={mahasiswa}
                    onEdit={handleEdit}
                    onDelete={deleteMahasiswa}
                    form={form}
                    isEdit={isEdit}
                    onAdd={addMahasiswa}
                    onUpdate={updateMahasiswa}
                    onInputChange={handleInputChange}
                  />
                }
              />
              <Route path="/about" element={<About contacts={contacts} />} />
              <Route path="/contact" element={<Contact onSubmitContact={handleAddContact} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
