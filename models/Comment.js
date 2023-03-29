const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  timestamp: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports  = mongoose.model('Comment', commentSchema);