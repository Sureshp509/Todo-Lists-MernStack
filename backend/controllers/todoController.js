const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
    const { name } = req.body;
    try {
        const newTodo = new Todo({
            userId: req.user.id,
            name,
        });
        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTodo = async (req, res) => {
    const { name, items } = req.body;
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: { name, items } },
            { new: true }
        );
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


