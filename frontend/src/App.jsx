// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext'; // Correct import

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  return authState.token ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
      <Route exact path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
