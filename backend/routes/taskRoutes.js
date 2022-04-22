const express = require('express');

const app = express.Router();
const taskRepository = require('../repositories/TaskRepository');


// add a task to existing or default project
app.post('/', (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    done: req.body.done,
    dueDate: req.body.dueDate,
    projectId: req.body.projectId
  }
  taskRepository.createTask(task).then((task) => {
    res.json(task);
  }).catch((error) => console.log(error));
});

// get list of tasks for a certain project
app.get('/:projectId', (req, res) => {
  taskRepository.findAllByProjectId(req.params.projectId).then((tasks) => {
    res.json(tasks);
  }).catch((error) => console.log(error));
});

app.delete('/:taskId', (req, res) => {
  const { taskId } = req.params;
  taskRepository.deleteById(taskId).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${taskId}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

app.patch('/:id', (req, res) => {
  taskRepository.updateById(req.params.id, req.body).then((task) => {
    res.json(task);
  }).catch((error) => console.log(error));
});

module.exports = app;