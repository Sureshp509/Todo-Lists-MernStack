// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: localStorage.getItem('token'),
  });

  const setAuthInfo = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    const decoded = jwtDecode(token);
    setAuthState({ user: decoded.user, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ user: null, token: null });
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
