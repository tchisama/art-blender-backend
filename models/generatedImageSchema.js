const mongoose = require('mongoose');

const generatedImageSchema = new mongoose.Schema({
  results : {
    type : [{
      prompt : String,
      url : String
    }],
    required : true
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

const GeneratedImage = mongoose.model('GeneratedImage', generatedImageSchema);

module.exports = {GeneratedImage};
