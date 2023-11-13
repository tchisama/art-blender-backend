// server.js
const express = require('express');
const bodyParser = require('body-parser');
const generateImageRoute = require('./routes/generateImageRoute');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute'); // Adjust the path based on your file structure
const promptRoutes = require('./routes/generatePromptRoute'); // Adjust the path based on your file structure
require('dotenv').config();




const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Cors
app.use(cors());

// Routes
app.use('/api', generateImageRoute);
app.use('/users', userRoutes);
app.use('/prompts', promptRoutes);


const MONGO_URI = process.env.MONGO_URL;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});