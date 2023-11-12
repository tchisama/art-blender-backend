const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControler'); // Adjust the path based on your file structure

// Define routes
router.post('/register', userController.registerUser);

module.exports = router;
