//repositories/TodoRepository

const Todo = require('../models/Todo');

class TodoRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new todo
  createTodo(name) {
    const newTodo = { name, subTodos: [] };
    const todo = new this.model(newTodo);

    return todo.save();
  }

  // create a subtask

  async createSubTodo(todoId, subTodoName)
  {
    const todo = await this.model.findById(todoId).exec();
    const newTodo = { name: subTodoName, done : false };

    todo.subTodos.push(newTodo);
    
    return todo.save();
  }

  // return all todos

  findAll() {
    return this.model.find();
  }

  //find todo by the id
  findById(id) {
    return this.model.findById(id);
  }

  //find subtodo by subtodoId
  async findSubTodoById(todoId, subTodoId) {
    const todo = await this.model.findById(todoId).exec();
    return todo.subTodos.find(subTodo => subTodo.id === subTodoId);
  }

    // delete todo
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  async deleteSubTodoById(todoId, subTodoId) {
    const todo = await this.model.findById(todoId).exec();
    todo.subTodos.splice(todo.subTodos.findIndex(subTodo => subTodo.id === subTodoId), 1);

    return todo.save();
  };

  // update todo name
  async updateTodoById(id, name) {
    const todo = await this.model.findById(id).exec();
    todo.name = name;

    return todo.save();
  }

  //update subtodo name
  async updateSubTodoById(todoId, subTodoId, object) {
    const todo = await this.model.findById(todoId).exec();
    const index = todo.subTodos.findIndex(subTodo => subTodo.id === subTodoId);

    todo.subTodos[index].name = object.name;
    todo.subTodos[index].done = object.done;
    
    return todo.save();
  }
}

module.exports = new TodoRepository(Todo);