// src/components/Dashboard/UserInfo.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
const UserInfo = () => {
  const { authState } = useAuth();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">User Information</h3>
      <p>Email: {authState.user.email}</p>
      {/* Add more user details if needed */}
    </div>
  );
};

export default UserInfo;
