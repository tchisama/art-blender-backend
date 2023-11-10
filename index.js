// server.js
const express = require('express');
const bodyParser = require('body-parser');
const generateImageRoute = require('./routes/generateImageRoute');
const OpenAI = require("openai");
const cors = require('cors');



const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Cors
app.use(cors());

// Routes
app.use('/api', generateImageRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

