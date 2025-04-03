import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Component/Login';
import SignUp from './Component/Signup';
import Dashboard from './Component/Dashboard';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
  );
}

export default App;
