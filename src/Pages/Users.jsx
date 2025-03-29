import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCircle, Pencil, Trash2, Upload, X, Save, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Error loading users', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      showNotification('User deleted successfully');
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('Error deleting user', 'error');
    }
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setNewAvatar(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewAvatar(imageUrl);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${editingUser.id}`, editingUser);
      showNotification('User updated successfully');
      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...editingUser, avatar: newAvatar || user.avatar } : user
        )
      );
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Error updating user', 'error');
    }
  };

  const handleLogout = () => {
    showNotification('Logging out...');
    
    
    localStorage.removeItem('authToken');
    
    
    setTimeout(() => {
      
      navigate('/');
      
      
    }, 1000);
    
    setShowLogoutMenu(false);
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLogoutMenu && !event.target.closest('.user-menu-container')) {
        setShowLogoutMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogoutMenu]);

  
  const renderPaginationNumbers = () => {
    let pages = [];
    
    
    pages.push(
      <button
        key="first"
        onClick={() => setPage(1)}
        className={`h-10 w-10 flex items-center justify-center rounded-full ${
          page === 1 ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100'
        }`}
      >
        1
      </button>
    );
    
    
    if (page > 3) {
      pages.push(
        <span key="dots1" className="px-2">...</span>
      );
    }
    
    
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown
      
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`h-10 w-10 flex items-center justify-center rounded-full ${
            page === i ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    
    
    if (page < totalPages - 2) {
      pages.push(
        <span key="dots2" className="px-2">...</span>
      );
    }
    
    
    if (totalPages > 1) {
      pages.push(
        <button
          key="last"
          onClick={() => setPage(totalPages)}
          className={`h-10 w-10 flex items-center justify-center rounded-full ${
            page === totalPages ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100'
          }`}
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-md flex items-center gap-2 ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white z-50`}>
          {notification.type === 'error' ? 
            <AlertCircle className="w-5 h-5" /> : 
            <CheckCircle className="w-5 h-5" />
          }
          <p>{notification.message}</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-600 p-5 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <UserCircle className="mr-2 w-6 h-6" />
              User Management
            </h1>
            <p className="text-blue-100 mt-1 text-sm"></p>
          </div>
          
          {/* User Avatar Menu */}
          <div className="relative user-menu-container">
            <button 
              onClick={() => setShowLogoutMenu(!showLogoutMenu)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
            >
              <UserCircle className="w-6 h-6 text-white" />
            </button>
            
            {showLogoutMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-20 bg-gradient-to-r from-blue-400 to-blue-500"></div>
              <div className="p-4 pt-0 -mt-10 text-center">
                <div className="inline-block rounded-full border-4 border-white overflow-hidden">
                  <img 
                    src={user.avatar} 
                    alt={`${user.first_name} ${user.last_name}`} 
                    className="w-20 h-20 object-cover"
                  />
                </div>
                <h3 className="mt-3 text-lg font-medium">{user.first_name} {user.last_name}</h3>
                <p className="text-gray-500 text-sm">{user.email || 'No email available'}</p>
                
                <div className="mt-4 flex justify-center gap-2">
                  <button 
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    <Pencil className="w-4 h-4 mr-1 inline-block" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-1 inline-block" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Google-style Pagination */}
        <div className="flex justify-center items-center p-6 border-t border-gray-100">
          {/* Previous button */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`mr-2 px-4 py-2 rounded-full flex items-center justify-center ${
              page === 1 ? 'text-gray-400 cursor-default' : 'text-blue-500 hover:bg-blue-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="ml-1 hidden sm:inline">Previous</span>
          </button>
          
          {/* Page numbers */}
          <div className="flex items-center">
            {renderPaginationNumbers()}
          </div>
          
          {/* Next button */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`ml-2 px-4 py-2 rounded-full flex items-center justify-center ${
              page === totalPages ? 'text-gray-400 cursor-default' : 'text-blue-500 hover:bg-blue-50'
            }`}
          >
            <span className="mr-1 hidden sm:inline">Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                Edit User
              </h2>
              <button 
                onClick={() => setEditingUser(null)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <img 
                    src={newAvatar || editingUser.avatar} 
                    alt="User Avatar" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <label className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full cursor-pointer">
                    <Upload className="w-4 h-4 text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarChange} 
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editingUser.first_name || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editingUser.last_name || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editingUser.email || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setEditingUser(null)} 
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate} 
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Added margin-top for spacing between main content and footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Users;