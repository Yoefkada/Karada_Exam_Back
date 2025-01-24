const express = require('express');
const router = express.Router();
const {
  validateLogin,
  handleValidationErrors,
  validateRegistration,
} = require('../utils/validation');
const {
  loginUser,
  registerUser,
  logOutUser,
} = require('../controllers/userController');
const authenticate = require('../utils/auth');

// User authentication routes
router.post('/login', validateLogin, handleValidationErrors, loginUser);
router.post('/register', validateRegistration, handleValidationErrors, registerUser);
router.post('/logout', logOutUser);

module.exports = router;
