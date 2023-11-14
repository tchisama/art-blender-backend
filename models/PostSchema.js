
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  results : {
    type : [{
      prompt : String,
      url : String
    }],
    required : true
  },
  description:{
    type: String,
    required: true
  },
  likes:{
    type: Number,
    default: 0
  },
  prompt:{
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  n: {
    type: Number,
    required: true,
  },
  dallev: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
}
);

const PostSchema = mongoose.model('Post', postSchema);

module.exports = {PostSchema};