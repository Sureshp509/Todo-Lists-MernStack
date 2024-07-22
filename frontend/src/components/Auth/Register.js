// src/components/Register/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const[error,setError]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://todo-lists-mernstack.onrender.com/api/auth/register`, { email, password });
      navigate('/login');
    } catch (err) {
     // console.log(err.response.data.msg)
      setError(err.response ? err.response.data.msg : "");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Todo Application</h2>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
         <p>Already have account?</p> <Link to="/login"><u>Login</u></Link>
         {error && <div className="mb-4 text-red-500">{error}</div>} {/* Conditionally render error */}
        </form>
      </div>
    </div>
  );
};

export default Register;
