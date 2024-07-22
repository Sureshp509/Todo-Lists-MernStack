import React from 'react';

const TodoItem = ({ item, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(item._id);
  };

  const handleUpdate = () => {
    onUpdate(item._id);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <span>{item.name}</span>
      <div>
        <button onClick={handleUpdate} className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
