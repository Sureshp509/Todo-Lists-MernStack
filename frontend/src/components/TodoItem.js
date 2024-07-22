// src/components/Dashboard/TodoItem.js
import React from 'react';

const TodoItem = ({ item, onDelete, onUpdate }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span>{item.text}</span>
      <div>
        <button onClick={() => onUpdate(item._id)} className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
        <button onClick={() => onDelete(item._id)} className="delete-btn text-white px-2 py-1 rounded-md">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
