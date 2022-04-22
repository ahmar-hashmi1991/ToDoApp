//repositories/TaskRepository

const Task = require('../models/Task');

class TaskRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new task
  createTask(taskObject) {
    const task = new this.model(taskObject);

    return task.save();
  }

  findAllByProjectId(id) {
    return this.model.find( { projectId : id } );
  }

  //find task by the id
  findById(id) {
    return this.model.findById(id);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(projectId, object) {
    return this.model.findByIdAndUpdate(projectId, object, {
      new: true,
      runValidators: true
    });
  }
}

module.exports = new TaskRepository(Task);