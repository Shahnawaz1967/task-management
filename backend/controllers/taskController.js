const Task = require("../models/Task")
const { validationResult } = require("express-validator")
const asyncHandler = require("../utils/asyncHandler")

// Get all tasks for the authenticated user
const getTasks = asyncHandler(async (req, res) => {
  try {
    const { status, search, sortBy = "createdAt", sortOrder = "desc" } = req.query

    // Build query
    const query = { user: req.user._id }

    if (status && status !== "All") {
      query.status = status
    }

    if (search) {
      query.title = { $regex: search, $options: "i" }
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    const tasks = await Task.find(query).sort(sort)

    res.json({
      message: "Tasks retrieved successfully",
      tasks,
    })
  } catch (error) {
    console.error("Get tasks error:", error)
    res.status(500).json({ message: "Server error while fetching tasks" })
  }
})

// Get single task
const getTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json({
      message: "Task retrieved successfully",
      task,
    })
  } catch (error) {
    console.error("Get task error:", error)
    res.status(500).json({ message: "Server error while fetching task" })
  }
})

// Create new task
const createTask = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { title, description, dueDate, priority, status } = req.body

    const task = new Task({
      title,
      description,
      dueDate,
      priority: priority || "Medium",
      status: status || "Pending",
      user: req.user._id,
    })

    await task.save()

    res.status(201).json({
      message: "Task created successfully",
      task,
    })
  } catch (error) {
    console.error("Create task error:", error)
    res.status(500).json({ message: "Server error while creating task" })
  }
})

// Update task
const updateTask = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { title, description, dueDate, priority, status } = req.body

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, dueDate, priority, status },
      { new: true, runValidators: true },
    )

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json({
      message: "Task updated successfully",
      task,
    })
  } catch (error) {
    console.error("Update task error:", error)
    res.status(500).json({ message: "Server error while updating task" })
  }
})

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Delete task error:", error)
    res.status(500).json({ message: "Server error while deleting task" })
  }
})

// Toggle task completion
const toggleTaskCompletion = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    task.status = task.status === "Completed" ? "Pending" : "Completed"
    await task.save()

    res.json({
      message: "Task status updated successfully",
      task,
    })
  } catch (error) {
    console.error("Toggle task error:", error)
    res.status(500).json({ message: "Server error while updating task status" })
  }
})

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
}
