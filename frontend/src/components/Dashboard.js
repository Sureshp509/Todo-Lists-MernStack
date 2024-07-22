// src/components/Dashboard/Dashboard.js
import React from 'react';
import UserInfo from './UserInfo';
import TodoList from './Todo/TodoList';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">Dashboard</h1>
        <button onClick={logout} className="logout-btn px-4 py-2 rounded-md">Logout</button>
      </header>
      <main className="w-full max-w-4xl p-4">
        <UserInfo />
        <TodoList />
      </main>
    </div>
  );
};

export default Dashboard;
