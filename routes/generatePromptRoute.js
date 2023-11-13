
const express = require('express');
const router = express.Router();
const promptController = require('../controllers/generatePrompt'); // Adjust the path based on your file structure

// Define routes
router.post('/createPrompt', promptController.createPrompt);

module.exports = router;