const Todo = require('../models/Todo');

// Create a new to-do item
exports.createTodoItem = async (req, res) => {
    const { todoId, text,status } = req.body;

    try {
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const newItem = {
            text,
            status,
        };

        todo.items.push(newItem);
        await todo.save();

        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Read all to-do items
exports.getTodoItems = async (req, res) => {
    const { todoId } = req.params;

    try {
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(todo.items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a to-do item
exports.updateTodoItem = async (req, res) => {
    const todoId=req.params.todoId;
    const { items } = req.body;
    const user=req.user;
    try {
        let todo = await Todo.findOne({_id:todoId,userId:user.id});
        
        if (!todo) {
            return res.status(404).json({ error:true,message: 'Todo not found' });
        }
    
        if(items) todo.items=items;
        await todo.save();
        return res.json({
            error:false,
            todo,
            message:"TodoItem Updated Successfully",
           })
    } catch (error) {
        res.status(500).send({error:error.message,message:'Internal Server Error'});
    }
};

// Delete a to-do item
exports.deleteTodoItem = async (req, res) => {
    const { todoId, itemId } = req.params;

    try {
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const item = todo.items.id(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.remove();
        await todo.save();

        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
