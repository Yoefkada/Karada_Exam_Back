const express = require('express');
const {
  addTask,
  addCategory,
  deleteTask,
  getTasks,
  getTaskById,
  deleteCategory,
  getCategoryById,
  editTask,
} = require('../controllers/taskController');
const authenticate = require('../utils/auth');
const {
  validateTask,
  handleValidationErrors,
  validateCategory,
} = require('../utils/validation');

const router = express.Router();

// Task routes
router.get('/', authenticate, getTasks);
router.post('/add', authenticate, validateTask, handleValidationErrors, addTask);
router.put('/:id', authenticate, validateTask, handleValidationErrors, editTask);
router.get('/:id', authenticate, getTaskById);
router.delete('/:id', authenticate, deleteTask);

// Category routes
router.post('/category', authenticate, validateCategory, handleValidationErrors, addCategory);
router.get('/category/:id', authenticate, getCategoryById);
router.delete('/category/:id', authenticate, deleteCategory);

<<<<<<< HEAD
=======
router.put("/:id", authenticateToken, taskValidation, validateData, editTask);
router.get("/:id", authenticateToken, getTaskById);
router.get("/category/:id", authenticateToken, getCategoryById);
router.patch("/delete/:id", authenticateToken, deleteTask);
router.delete("/category/:id", authenticateToken, deleteCategory);
>>>>>>> e684b0b23e8dfd699f524c6ba022600ea6645df5
module.exports = router;
