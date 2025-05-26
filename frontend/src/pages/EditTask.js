"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../utils/api"
import toast from "react-hot-toast"
import { ArrowLeft, Calendar, Flag, FileText } from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"

const EditTask = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  })
  const [errors, setErrors] = useState({})

  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/api/tasks/${id}`)
        const task = response.data.task

        setFormData({
          title: task.title,
          description: task.description || "",
          dueDate: new Date(task.dueDate).toISOString().split("T")[0],
          priority: task.priority,
          status: task.status,
        })
      } catch (error) {
        console.error("Fetch task error:", error)
        toast.error("Failed to fetch task details")
        navigate("/dashboard")
      } finally {
        setFetchLoading(false)
      }
    }

    fetchTask()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      await api.put(`/api/tasks/${id}`, formData)
      toast.success("Task updated successfully!")
      navigate("/dashboard")
    } catch (error) {
      console.error("Update task error:", error)
      const message = error.response?.data?.message || "Failed to update task"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return <LoadingSpinner text="Loading task details..." />
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>
          <p className="text-gray-600">Update your task details</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <FileText size={16} />
              <span>Task Title *</span>
            </div>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`input-field ${errors.title ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="Enter task title"
            maxLength={100}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Enter task description (optional)"
            maxLength={500}
          />
          <p className="mt-1 text-sm text-gray-500">{formData.description.length}/500 characters</p>
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Due Date *</span>
            </div>
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className={`input-field ${errors.dueDate ? "border-red-500 focus:ring-red-500" : ""}`}
          />
          {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
        </div>

        {/* Priority and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Flag size={16} />
                <span>Priority</span>
              </div>
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="input-field">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center flex-1">
            {loading ? (
              <>
                <div className="spinner mr-2"></div>
                Updating Task...
              </>
            ) : (
              "Update Task"
            )}
          </button>
          <button type="button" onClick={() => navigate("/dashboard")} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTask
