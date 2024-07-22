const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
    const { name,items } = req.body;
    try {

        const newTodo = new Todo({
            userId: req.user.id,
            name,items
        });
        await newTodo.save();
       return res.json({
        error:false,
        newTodo,
        message:"Todo Added Successfully"
       })
    } catch (err) {
        res.status(500).json({error:true,message:'Internal Server Error'});
    }
};

exports.getTodos = async (req, res) => {
    const user=req.user;
    try {
        const todos = await Todo.find({ userId: user.id });
        return res.json({
            error:false,
            todos,
            message:"All Todos Retreived Successfully",
           });
    } catch (error) {
        
        res.status(500).json({error:error.message,message:'Internal Server Error'});
    }
};

exports.updateTodo = async (req, res) => {
    const todoId=req.params.todoId;
    const { name } = req.body;
    const user=req.user;
    try {
        let todo = await Todo.findOne({_id:todoId,userId:user.id});
        
        if (!todo) {
            return res.status(404).json({ error:true,message: 'Todo not found' });
        }
    
        if(name) todo.name=name;
      
        await todo.save();
        return res.json({
            error:false,
            todo,
            message:"Todo Updated Successfully",
           })
    } catch (error) {
        res.status(500).send({error:error.message,message:'Internal Server Error'});
    }
};

exports.deleteTodo = async (req, res) => {
    const todoId=req.params.todoId;
    const user=req.user;
    try {
        let todo = await Todo.findOne({_id:todoId,userId:user.id});
        if (!todo) {
            return res.status(404).json({ error:true,message: 'Todo not found' });
        }
        // if (todo.userId.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }
        await Todo.findByIdAndDelete(todoId);
        return res.json({
            error:false,
            todo,
            message:"Todo Deleted Successfully",
           })
    } catch (error) {
        res.status(500).send({error:error.message,message:'Internal Server Error'});
    }
};


