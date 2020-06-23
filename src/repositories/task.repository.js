const Task = require('../models/task');

exports.getTasksRepository = () => {
    const tasks = Task.find({});
    return tasks;
},

exports.createTaskRepository = (data) => {
    const newTask = new Task(data);
    newTask.save();
}