const mongoose = require('mongoose');

// Define schema for todo items
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  done: {
    type: Boolean,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;