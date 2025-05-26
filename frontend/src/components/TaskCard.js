"use client"
import { Link } from "react-router-dom"
import { Edit, Trash2, Calendar, Flag, CheckCircle, Circle, Clock, AlertTriangle } from "lucide-react"
import { format, isToday, isTomorrow, isPast } from "date-fns"

const TaskCard = ({ task, onDelete, onToggleComplete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200"
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      default:
        return "text-green-600 bg-green-50 border-green-200"
    }
  }

  const getDueDateInfo = (dueDate) => {
    const date = new Date(dueDate)
    const isOverdue = isPast(date) && task.status !== "Completed"

    if (isOverdue) {
      return { text: "Overdue", color: "text-red-600", icon: AlertTriangle, bgColor: "bg-red-50" }
    } else if (isToday(date)) {
      return { text: "Due Today", color: "text-orange-600", icon: Clock, bgColor: "bg-orange-50" }
    } else if (isTomorrow(date)) {
      return { text: "Due Tomorrow", color: "text-blue-600", icon: Calendar, bgColor: "bg-blue-50" }
    } else {
      return { text: format(date, "MMM dd, yyyy"), color: "text-gray-600", icon: Calendar, bgColor: "bg-gray-50" }
    }
  }

  const dueDateInfo = getDueDateInfo(task.dueDate)
  const DueDateIcon = dueDateInfo.icon

  return (
    <div className={`task-card fade-in ${task.status === "Completed" ? "task-completed" : ""} glow-hover`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggleComplete(task._id)}
            className="text-gray-400 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
          >
            {task.status === "Completed" ? <CheckCircle size={24} className="text-green-600" /> : <Circle size={24} />}
          </button>
          <h3
            className={`font-semibold text-lg leading-tight ${
              task.status === "Completed" ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/edit-task/${task._id}`}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className={`text-gray-600 mb-4 leading-relaxed ${task.status === "Completed" ? "line-through" : ""}`}>
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${dueDateInfo.bgColor}`}>
            <DueDateIcon size={14} className={dueDateInfo.color} />
            <span className={dueDateInfo.color}>{dueDateInfo.text}</span>
          </div>

          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm border ${getPriorityColor(task.priority)}`}
          >
            <Flag size={14} />
            <span>{task.priority}</span>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
    </div>
  )
}

export default TaskCard
