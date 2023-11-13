const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControler'); // Adjust the path based on your file structure

// Define routes
router.post('/register', userController.registerUser);
router.post('/get-user-by-email', userController.getUserByEmail);

module.exports = router;
