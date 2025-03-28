import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUserPopup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editData, setEditData] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        const userData = response.data.data;
        setEditData({ first_name: userData.first_name, last_name: userData.last_name, email: userData.email });
      } catch (error) {
        setError('Failed to fetch user data.');
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, editData);
      alert('User updated successfully');
      navigate('/users');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          value={editData.first_name}
          onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
          className="border p-2 rounded w-full mb-2"
          placeholder="First Name"
        />
        <input
          type="text"
          value={editData.last_name}
          onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
          className="border p-2 rounded w-full mb-2"
          placeholder="Last Name"
        />
        <input
          type="email"
          value={editData.email}
          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          className="border p-2 rounded w-full mb-2"
          placeholder="Email"
        />
        <div className="flex justify-end">
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
          <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserPopup;
