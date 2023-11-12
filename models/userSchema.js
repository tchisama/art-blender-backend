const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, // You can store the URL or file path to the user's image
  },
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module', // Assuming you have a Module model
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LikedItem', // Assuming you have a LikedItem model
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
