
// routes/Post
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // Adjust the path based on your file structure

// POST /api/postRoutes
router.post('/createPost', postController.createPost);

module.exports = router;