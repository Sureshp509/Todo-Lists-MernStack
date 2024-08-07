import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { useAuth } from '../../context/AuthContext';

const TodoList = () => {
  const [todos, setTodos] = useState([]); // Initialize as an empty array
  const [newTodo, setNewTodo] = useState('');
  const [success,setSuccess]=useState("");
  const { authState } = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/todos`, {
          headers: {
            'x-auth-token': `${authState.token}`
          }
        });
        if (res.data) {
         
          setTodos(res.data.todos);
         
        } else {
          console.warn('Unexpected response format:', res.data);
          setTodos([]); // Default to empty array if not
        }
      } catch (err) {
        console.error('Error fetching todos:', err.response ? err.response.data : "");
        setTodos([]);

      }
    };

    fetchTodos();
  }, [authState.token]);

  const addTodo = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/todos`, { name: newTodo }, {
        headers: {
          'x-auth-token': `${authState.token}`
        }
      });
      console.log(res.data)
      setSuccess(res.data.message)
      setTodos([...todos, res.data.newTodo]);
      
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/todos/${id}`, {
        headers: {
          'x-auth-token': `${authState.token}`
        }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const updateTodo = async (id) => {
    const updatedText = prompt('Enter new text:');
    if (!updatedText) return;

    try {
      const res = await axios.put(`${apiUrl}/api/todos/${id}`, { name: updatedText }, {
        headers: {
          'x-auth-token': `${authState.token}`
        }
      });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-bold mb-2">To-Do List</h3>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="border p-2 rounded w-full"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Add</button>
        {success && <div className="mb-4 text-red-500">{success}</div>}
      </div>
      <div>
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo._id} // Unique key prop
              item={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
