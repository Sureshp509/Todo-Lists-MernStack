const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const {createTodoItem} =require('../controllers/todoItemController');
const auth = require('../middleware/auth');

// Create a new to-do
router.post('/', auth, createTodo);

// Get all to-dos for the logged-in user
router.get('/', auth, getTodos);

// Update a to-do
router.put('/:id', auth, updateTodo);

// Delete a to-do
router.delete('/:id', auth, deleteTodo);

// Create a new to-do-item
router.post('/', auth, createTodoItem);

module.exports = router;
