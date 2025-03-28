import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditUserPopup from './EditUserPopup';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError('Failed to fetch users. Please try again.');
      }
    };

    fetchUsers();
  }, [navigate, page]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      alert('User deleted successfully');
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const handleClosePopup = () => {
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mb-4">Logout</button>
      <h1 className="text-3xl font-bold mb-4">Users List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id} className="bg-white p-4 mb-2 shadow-md rounded">
            <div>
              <p><strong>{user.first_name} {user.last_name}</strong></p>
              <p>{user.email}</p>
              <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mt-2" />
              <button onClick={() => handleEditClick(user)} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">Edit</button>
              <button onClick={() => handleDeleteClick(user.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {editingUser && <EditUserPopup user={editingUser} onClose={handleClosePopup} setUsers={setUsers} users={users} />}
    </div>
  );
};

export default Users;
