const express = require("express")
const { body } = require("express-validator")
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} = require("../controllers/taskController")
const auth = require("../middleware/auth")

const router = express.Router()

// Validation rules
const taskValidation = [
  body("title").trim().isLength({ min: 1, max: 100 }).withMessage("Title must be between 1 and 100 characters"),
  body("description").optional().trim().isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),
  body("dueDate").isISO8601().withMessage("Please provide a valid due date"),
  body("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Priority must be Low, Medium, or High"),
  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Status must be Pending, In Progress, or Completed"),
]

// Apply auth middleware to all routes
router.use(auth)

// Routes
router.get("/", getTasks)
router.get("/:id", getTask)
router.post("/", taskValidation, createTask)
router.put("/:id", taskValidation, updateTask)
router.delete("/:id", deleteTask)
router.patch("/:id/toggle", toggleTaskCompletion)

module.exports = router
