const User = require('../models/userSchema'); // Adjust the path based on your file structure

const registerUser = async (req, res) => {
  try {
    const { name, username, email, image } = req.body;

    // Create a new user instance
    const newUser = new User({
      name,
      username,
      email,
      image,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
};
