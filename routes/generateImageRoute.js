// routes/generateImageRoute.js
const express = require('express');
const router = express.Router();
const generateImageController = require('../controllers/generateImageController');

// POST /api/generateImage
router.post('/generateImage', generateImageController.generateImage);

module.exports = router;