import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaSort, FaUserGraduate } from 'react-icons/fa';
import axios from 'axios';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const About = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [formData, setFormData] = useState({
    npm: '',
    nama: '',
    kelas: '',
    jurusan: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [oldNpm, setOldNpm] = useState('');

  const BASE_URL = 'http://localhost/project1/axios';

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/read.php`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
    });
  };

  const sortedContacts = React.useMemo(() => {
    if (!sortConfig.key) return contacts;
    return [...contacts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [contacts, sortConfig]);

  const filteredContacts = sortedContacts.filter(contact =>
    Object.values(contact).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const deleteContact = async (npm) => {
    try {
      await axios.post(`${BASE_URL}/delete.php`, { npm });
      fetchContacts();
      alert('Contact deleted successfully!');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setOldNpm(contact.npm);
    setIsEdit(true);
  };

  const updateContact = async () => {
    try {
      await axios.post(`${BASE_URL}/update.php`, { ...formData, old_npm: oldNpm });
      fetchContacts();
      alert('Contact updated successfully!');
      setFormData({ npm: '', nama: '', kelas: '', jurusan: '' });
      setIsEdit(false);
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateContact();
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSearchChange = (e) => {
    try {
      setSearchTerm(e.target.value);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-blue-400/20 shadow-[0_0_15px_rgba(96,165,250,0.2)]"
        >
          <div className="flex items-center justify-center mb-8 space-x-3">
            <FaUserGraduate className="text-blue-400 text-3xl" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Data Mahasiswa
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Cari Mahasiswa..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="w-full px-4 py-2 pl-10 bg-black/30 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400/50" />
          </div>

          {contacts.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-blue-400/20">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                      {['NPM', 'Nama', 'Kelas', 'Jurusan', 'Actions'].map((heading) => (
                        <th
                          key={heading}
                          onClick={() => heading !== 'Actions' && handleSort(heading.toLowerCase())}
                          className="px-4 py-3 text-left text-sm font-medium text-blue-300 border-b border-blue-400/20 cursor-pointer hover:bg-blue-800/30 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <span>{heading}</span>
                            {heading !== 'Actions' && <FaSort className="text-blue-400/50" />}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact, index) => (
                      <motion.tr
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        key={index}
                        className="hover:bg-blue-900/30 transition-colors group"
                      >
                        <td className="px-4 py-3 text-blue-200 border-b border-blue-400/20 group-hover:text-blue-100">{contact.npm}</td>
                        <td className="px-4 py-3 text-blue-200 border-b border-blue-400/20 group-hover:text-blue-100">{contact.nama}</td>
                        <td className="px-4 py-3 text-blue-200 border-b border-blue-400/20 group-hover:text-blue-100">{contact.kelas}</td>
                        <td className="px-4 py-3 text-blue-200 border-b border-blue-400/20 group-hover:text-blue-100">{contact.jurusan}</td>
                        <td className="px-4 py-3 text-blue-200 border-b border-blue-400/20 group-hover:text-blue-100">
                          <button
                            onClick={() => handleEdit(contact)}
                            className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteContact(contact.npm)}
                            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-8 bg-black/20 rounded-lg border border-blue-400/20"
            >
              <p className="text-blue-300 text-lg">No contacts submitted yet.</p>
              <p className="text-blue-400/60 mt-2">Submit a contact using the Contact form</p>
            </motion.div>
          )}

          {/* Table Stats */}
          {contacts.length > 0 && (
            <div className="mt-4 text-right text-sm text-blue-400/60">
              Menampilkan {filteredContacts.length} dari {contacts.length} Data Mahasiswa
            </div>
          )}

          {/* Edit Form */}
          {isEdit && (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-blue-300">NPM</label>
                  <input
                    type="text"
                    value={formData.npm}
                    onChange={(e) => setFormData({ ...formData, npm: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 bg-black/30 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-300">Nama</label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 bg-black/30 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-300">Kelas</label>
                  <input
                    type="text"
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 bg-black/30 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-300">Jurusan</label>
                  <input
                    type="text"
                    value={formData.jurusan}
                    onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 bg-black/30 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </ErrorBoundary>
  );
};

export default About;
