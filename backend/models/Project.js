const mongoose = require('mongoose');

// Define schema for Project items
const projectSchema = new mongoose.Schema({
  title: {
      type: String,
      required: [true, 'A project must have a title']
  },
  description: {
      type: String,
      required: false,
      default: ''
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;