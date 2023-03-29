const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  text:{
    type: String,
    required: true,
  },
  comments:[{
    type: Schema.Types.ObjectId,
    required: true,
  }],
  timestamp:{
    type: Date,
    required: true,
  }
});

module.exports  = mongoose.model('Post', postSchema);