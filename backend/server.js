const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

// Import routes
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Add import at the top:
const errorHandler = require("./middleware/errorHandler")

// Add 404 handler before error handler:
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Error handling middleware (should be last)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
