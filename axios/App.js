import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({ npm: '', nama: '', kelas: '', jurusan: '' });
  const [isEdit, setIsEdit] = useState(false);

  const BASE_URL = 'http://localhost/project1/axios';

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/read.php`);
      setMahasiswa(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch mahasiswa');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addMahasiswa = async () => {
    if (!form.npm || !form.nama || !form.kelas || !form.jurusan) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/create.php`, {
        npm: form.npm,
        nama: form.nama,
        kelas: form.kelas,
        jurusan: form.jurusan,
      });
      setForm({ npm: '', nama: '', kelas: '', jurusan: '' });
      fetchMahasiswa();
    } catch (error) {
      console.error('Error adding mahasiswa:', error);
      alert('Failed to add mahasiswa');
    }
  };

  const updateMahasiswa = async () => {
    if (!form.npm || !form.nama || !form.kelas || !form.jurusan) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/update.php`, form);
      setForm({ npm: '', nama: '', kelas: '', jurusan: '' });
      setIsEdit(false);
      fetchMahasiswa();
    } catch (error) {
      console.error('Error updating mahasiswa:', error);
      alert('Failed to update mahasiswa');
    }
  };

  const deleteMahasiswa = async (npm) => {
    try {
      await axios.post(`${BASE_URL}/delete.php`, { npm });
      fetchMahasiswa();
    } catch (error) {
      console.error('Error deleting mahasiswa:', error);
      alert('Failed to delete mahasiswa');
    }
  };

  const handleEdit = (mahasiswa) => {
    setForm(mahasiswa);
    setIsEdit(true);
  };

  return (
    <div>
      <h1>Mahasiswa CRUD</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEdit ? updateMahasiswa() : addMahasiswa();
        }}
      >
        <input
          type="text"
          name="npm"
          placeholder="NPM"
          value={form.npm}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="kelas"
          placeholder="Kelas"
          value={form.kelas}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="jurusan"
          placeholder="Jurusan"
          value={form.jurusan}
          onChange={handleInputChange}
        />
        <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {mahasiswa.map((mhs) => (
          <li key={mhs.npm}>
            {mhs.npm} - {mhs.nama} - {mhs.kelas} - {mhs.jurusan}
            <button onClick={() => handleEdit(mhs)}>Edit</button>
            <button onClick={() => deleteMahasiswa(mhs.npm)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
