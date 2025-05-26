

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/api"
import toast from "react-hot-toast"
import { ArrowLeft, Calendar, Flag, FileText, Save } from "lucide-react"

const CreateTask = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  })
  const [errors, setErrors] = useState({})

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
    } else if (new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = "Due date cannot be in the past"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      await api.post("/api/tasks", formData)
      toast.success("Task created successfully!")
      navigate("/dashboard")
    } catch (error) {
      console.error("Create task error:", error)
      const message = error.response?.data?.message || "Failed to create task"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Task
          </h1>
          <p className="text-gray-600">Add a new task to your workflow</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-3">
            <div className="flex items-center space-x-2">
              <FileText size={16} className="text-blue-500" />
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
            placeholder="Enter a descriptive task title"
            maxLength={100}
          />
          {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
          <p className="mt-1 text-sm text-gray-500">{formData.title.length}/100 characters</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-3">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Describe your task in detail (optional)"
            maxLength={500}
          />
          <p className="mt-1 text-sm text-gray-500">{formData.description.length}/500 characters</p>
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-3">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-blue-500" />
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
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.dueDate && <p className="mt-2 text-sm text-red-600">{errors.dueDate}</p>}
        </div>

        {/* Priority and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-3">
              <div className="flex items-center space-x-2">
                <Flag size={16} className="text-blue-500" />
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
              <option value="Low">🟢 Low Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="High">🔴 High Priority</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-3">
              Initial Status
            </label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="input-field">
              <option value="Pending">📋 Pending</option>
              <option value="In Progress">⏳ In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
          <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center flex-1">
            {loading ? (
              <>
                <div className="spinner mr-2"></div>
                Creating Task...
              </>
            ) : (
              <>
                <Save size={20} className="mr-2" />
                Create Task
              </>
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

export default CreateTask
