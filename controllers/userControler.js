const User = require('../models/userSchema'); // Adjust the path based on your file structure

const registerUser = async (req, res) => {
  try {
    const { name, username, email, image , userId } = req.body;
    const user = await User.findOne({ email});
    if (user) {
      return res.json({ message: 'User already exists' });
    }
    // Create a new user instance
    const newUser = new User({
      name,
      username,
      email,
      image,
      userId
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(user){
      res.status(200).json({ user });
    }else{
      res.status(404).json({ user: false });
    }
  }catch(err){

  }
}

module.exports = {
  registerUser,
  getUserByEmail
};
