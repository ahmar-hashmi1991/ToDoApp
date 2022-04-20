const mongoose = require('mongoose');

// Define schema for todo items
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'A todo must have a name'],
    // unique: true,
    // trim: true
  },
  subTodos: [{
    name: String,
    done: Boolean
  }]
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;