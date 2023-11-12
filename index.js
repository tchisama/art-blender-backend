// server.js
const express = require('express');
const bodyParser = require('body-parser');
const generateImageRoute = require('./routes/generateImageRoute');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute'); // Adjust the path based on your file structure





const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Cors
app.use(cors());

// Routes
app.use('/api', generateImageRoute);
app.use('/users', userRoutes);





// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb+srv://tchisama:helloworld@cluster0.aryogkr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});