const { check, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      error: validationErrors.array()[0].msg,
    });
  }
  next();
};

const validateLogin = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required and must be valid')
    .isLength({ min: 2 })
    .withMessage('Email must be at least 2 characters long'),
  check('password')
    .notEmpty()
    .withMessage('Password is required and must be valid')
    .isLength({ min: 2 })
    .withMessage('Password must be at least 2 characters long'),
];

const validateRegistration = [
  ...validateLogin,
  check('fullname')
    .notEmpty()
    .withMessage('Full name is required and must be valid')
    .isLength({ min: 2 })
    .withMessage('Full name must be at least 2 characters long'),
];

const validateTask = [
  check('title')
    .notEmpty()
    .withMessage('Title is required and must be valid')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Title must be at least 2 characters long'),
  check('content')
    .notEmpty()
    .withMessage('Content is required and must be valid')
    .isString()
    .withMessage('Content must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Content must be at least 2 characters long'),
];

const validateCategory = [
  check('title')
    .notEmpty()
    .withMessage('Title is required and must be valid')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Title must be at least 2 characters long'),
];

module.exports = {
  handleValidationErrors,
  validateCategory,
  validateLogin,
  validateRegistration,
  validateTask,
};
