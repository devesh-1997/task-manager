const Task = require('../models/task')
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id })
  if (!task) {
    return res.status(404).json({
      success: true,
      message: `no task with id ${req.params.id}`
    })
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  let task = await Task.findOneAndDelete({ _id: req.params.id })
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'no such task exists' + req.params.id
    })
  }
  res.status(200).json({
    success: true,
    message: `deleted successfully`
  })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true
  })
  if (!task) {
    return res.status(404).json({ success: false, message: `no task with id ${taskId}` })
  }
  res.status(200).json({ task })
})


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask
}
