"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { LogOut, Plus, Home, CheckSquare, User } from "lucide-react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <CheckSquare className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="flex items-center space-x-2">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-700 shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Home size={18} />
                <span className="hidden sm:block">Dashboard</span>
              </Link>

              <Link
                to="/create-task"
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive("/create-task")
                    ? "bg-blue-100 text-blue-700 shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Plus size={18} />
                <span className="hidden sm:block">New Task</span>
              </Link>
            </div>
          )}

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-gray-700 font-medium hidden sm:block">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                <LogOut size={18} />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-xl transition-all duration-200"
              >
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
