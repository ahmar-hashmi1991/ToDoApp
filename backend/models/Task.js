const mongoose = require('mongoose');

// Define schema for Task items
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A task must have a title']
  },
  description: {
    type: String,
    default: ''
  },
  done: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    default: Date.now()
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;