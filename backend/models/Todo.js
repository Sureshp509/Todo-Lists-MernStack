const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    items: [
        {
            text: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                default:"pending",
            },
        },
    ],
    createdOn:{type:Date,default:new Date().getTime()}
});

module.exports = mongoose.model('Todo', TodoSchema);
