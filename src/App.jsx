import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Users from './Pages/Users';
import EditUserPopup from './Pages/EditUserPopup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<EditUserPopup />} />

      </Routes>
    </Router>
  );
};

export default App;
