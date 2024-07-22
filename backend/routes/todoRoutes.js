const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const {
    createTodoItem,
    getTodoItems,
    updateTodoItem,
    deleteTodoItem,
} = require('../controllers/todoItemController');
const auth = require('../middleware/auth');

// Create a new to-do
router.post('/', auth, createTodo);

// Get all to-dos for the logged-in user
router.get('/', auth, getTodos);

// Update a to-do
router.put('/:todoId', auth, updateTodo);

// Delete a to-do
router.delete('/:todoId', auth, deleteTodo);

// To-do items routes
router.post('/items', auth, createTodoItem);
router.get('/:todoId/items', auth, getTodoItems);
router.put('/updateItem/:todoId', auth, updateTodoItem);
router.delete('/:todoId/items/:itemId', auth, deleteTodoItem);


module.exports = router;
