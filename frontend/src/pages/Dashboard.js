"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Plus, Search, Filter, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import TaskCard from "../components/TaskCard"
import LoadingSpinner from "../components/LoadingSpinner"
import api from "../utils/api"

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: "All",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  })

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (filters.status !== "All") params.append("status", filters.status)
      if (filters.search) params.append("search", filters.search)
      params.append("sortBy", filters.sortBy)
      params.append("sortOrder", filters.sortOrder)

      const response = await api.get(`/api/tasks?${params}`)
      setTasks(response.data.tasks)
    } catch (error) {
      console.error("Fetch tasks error:", error)
      toast.error("Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [filters])

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return

    try {
      await api.delete(`/api/tasks/${taskId}`)
      setTasks(tasks.filter((task) => task._id !== taskId))
      toast.success("Task deleted successfully")
    } catch (error) {
      console.error("Delete task error:", error)
      toast.error("Failed to delete task")
    }
  }

  // Toggle task completion
  const handleToggleComplete = async (taskId) => {
    try {
      const response = await api.patch(`/api/tasks/${taskId}/toggle`)
      setTasks(tasks.map((task) => (task._id === taskId ? response.data.task : task)))
      toast.success("Task status updated")
    } catch (error) {
      console.error("Toggle task error:", error)
      toast.error("Failed to update task status")
    }
  }

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Get task statistics
  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === "Completed").length
    const pending = tasks.filter((task) => task.status === "Pending").length
    const inProgress = tasks.filter((task) => task.status === "In Progress").length
    const overdue = tasks.filter((task) => new Date(task.dueDate) < new Date() && task.status !== "Completed").length

    return { total, completed, pending, inProgress, overdue }
  }

  const stats = getTaskStats()

  if (loading) {
    return <LoadingSpinner text="Loading your tasks..." />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to TaskFlow
        </h1>
        <p className="text-gray-600 text-lg">Manage and track your tasks with style and efficiency</p>
        <Link to="/create-task" className="btn-primary inline-flex items-center space-x-2">
          <Plus size={20} />
          <span>Create New Task</span>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 bounce-in">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Total Tasks</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-green-50 to-emerald-100 border-green-200 bounce-in">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <CheckCircle2 className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-yellow-50 to-amber-100 border-yellow-200 bounce-in">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <Clock className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">In Progress</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-red-50 to-red-100 border-red-200 bounce-in">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-500 rounded-xl">
              <AlertCircle className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800">Overdue</h3>
              <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-3">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="input-field w-auto min-w-[140px]"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-3">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="input-field w-auto min-w-[140px]"
            >
              <option value="createdAt">Created Date</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
              className="input-field w-auto"
            >
              <option value="desc">↓ Desc</option>
              <option value="asc">↑ Asc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center floating">
            <Plus size={48} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">No tasks found</h3>
          <p className="text-gray-600 mb-8 text-lg">
            {filters.search || filters.status !== "All"
              ? "Try adjusting your filters or search terms"
              : "Get started by creating your first task"}
          </p>
          <Link to="/create-task" className="btn-primary">
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <div key={task._id} style={{ animationDelay: `${index * 0.1}s` }}>
              <TaskCard task={task} onDelete={handleDeleteTask} onToggleComplete={handleToggleComplete} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
