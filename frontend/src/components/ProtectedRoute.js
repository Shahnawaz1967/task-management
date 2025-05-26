"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from "./LoadingSpinner"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
