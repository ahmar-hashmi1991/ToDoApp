const express = require('express');

const app = express.Router();
const projectRepository = require('../repositories/ProjectRepository');
const taskRepository = require('../repositories/TaskRepository');

// get all projects in the db
app.get('/', (req, res) => {
  projectRepository.findAll().then((projects) => {
    res.json(projects);
  }).catch((error) => console.log(error));
});

app.get('/:projectId', (req, res) => {
  const { projectId } = req.params;
  projectRepository.findById(projectId).then((project) => {
    res.json(project);
  }).catch((error) => console.log(error));
});

app.get('/:projectId/task/:taskId', (req, res) => {
  const { taskId } = req.params;
  taskRepository.findById(taskId).then((task) => {
    res.json(task);
  }).catch((error) => console.log(error));
});

app.post('/', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  projectRepository.create(title, description).then((project) => {
    res.json(project);
  }).catch((error) => console.log(error));
});

app.patch('/:projectId', (req, res) => {
  projectRepository.updateById(req.params.projectId, req.body).then((task) => {
    res.json(task);
  }).catch((error) => console.log(error));
});

app.delete('/:projectId', (req, res) => {
  const { projectId } = req.params;
  projectRepository.deleteById(projectId).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${projectId}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

module.exports = app;