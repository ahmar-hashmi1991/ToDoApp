//repositories/ProjectRepository

const Project = require('../models/Project');

class ProjectRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new project
  create(title, description) {
    const proj = { title, description };
    const project = new this.model(proj);

    return project.save();
  }

  // return all projects

  findAll() {
    return this.model.find();
  }

  //find project by the id
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

module.exports = new ProjectRepository(Project);