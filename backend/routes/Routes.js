const express = require('express');

const app = express.Router();
const repository = require('../repositories/TodoRepository');

// get all todo items in the db
app.get('/', (req, res) => {
  repository.findAll().then((todos) => {
    res.json(todos);
  }).catch((error) => console.log(error));
});

app.get('/:todoId', (req, res) => {
  const { todoId } = req.params;
  repository.findById(todoId).then((todos) => {
    res.json(todos);
  }).catch((error) => console.log(error));
});

app.get('/:todoId/:subTodoId', (req, res) => {
  const { todoId } = req.params;
  const { subTodoId } = req.params;
  repository.findSubTodoById(todoId, subTodoId).then((todos) => {
    res.json(todos);
  }).catch((error) => console.log(error));
});

// add a todo
app.post('/', (req, res) => {
  const { name } = req.body;
  repository.createTodo(name).then((todo) => {
    res.json(todo);
  }).catch((error) => console.log(error));
});

// add a subtodo to todo
app.post('/:todoId', (req, res) => {
  const { name } = req.body;
  const { todoId } = req.params;
  repository.createSubTodo(todoId, name).then((todo) => {
    res.json(todo);
  }).catch((error) => console.log(error));
});

// delete a todo item
app.delete('/:todoId', (req, res) => {
  const { todoId } = req.params;
  repository.deleteById(todoId).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${todoId}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// delete a sub-todo item
app.delete('/:todoId/:subTodoId', (req, res) => {
  const { todoId } = req.params;
  const { subTodoId } = req.params;
  repository.deleteSubTodoById(todoId, subTodoId).then((ok) => {
    console.log(ok);
    console.log(`Deleted sub-record with id: ${todoId} and sub-id: ${subTodoId}.`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/:todoId', (req, res) => {
  const { todoId } = req.params;
  const { todoName } = req.body.name;
  repository.updateTodoById(todoId, todoName)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});

// update a sub-todo item
app.put('/:todoId/:subTodoId', (req, res) => {
  const { todoId } = req.params;
  const { subTodoId } = req.params;
  const todo = { name: req.body.name, done: req.body.done };
  repository.updateSubTodoById(todoId, subTodoId, todo)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});
module.exports = app;