"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import api from "../utils/api"
import toast from "react-hot-toast"

const AuthContext = createContext()

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      }
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
      }
    default:
      return state
  }
}

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: true,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      localStorage.setItem("token", token)
    } else {
      delete api.defaults.headers.common["Authorization"]
      localStorage.removeItem("token")
    }
  }

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        setAuthToken(token)
        try {
          const response = await api.get("/api/auth/me")
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: response.data.user,
              token,
            },
          })
        } catch (error) {
          console.error("Load user error:", error)
          dispatch({ type: "AUTH_ERROR" })
          setAuthToken(null)
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    loadUser()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      const response = await api.post("/api/auth/login", {
        email,
        password,
      })

      const { token, user } = response.data

      setAuthToken(token)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      })

      toast.success("Login successful!")
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed"
      toast.error(message)
      dispatch({ type: "AUTH_ERROR" })
      return { success: false, message }
    }
  }

  // Register function
  const register = async (name, email, password) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
      })

      const { token, user } = response.data

      setAuthToken(token)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      })

      toast.success("Registration successful!")
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed"
      toast.error(message)
      dispatch({ type: "AUTH_ERROR" })
      return { success: false, message }
    }
  }

  // Logout function
  const logout = () => {
    setAuthToken(null)
    dispatch({ type: "LOGOUT" })
    toast.success("Logged out successfully!")
  }

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
