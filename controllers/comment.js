const CommentModel = require('../models/Comment');

//create comment
let createComment = async function(timestamp,createdBy,text){
  try{
    const comment = await CommentModel.create({
      timestamp: timestamp,
      createdBy: createdBy,
      text: text 
    });
    return comment;
  }catch(e){
    console.log(`There was an error, ${e} when creating a new comment`);
  }
};
//get comment
let getComment = async function(docID){
  try{
    const comment = await CommentModel.findById(docID);
    return comment;
  }catch(e){
    console.log(`there was an error, ${e} when creating a new comment`);
  }
};
//update comment
let updateComment = async function(docID, updatedComment){
  try{
    const comment = await CommentModel.findOneAndUpdate({_id: docID},updatedComment);
    return comment;
  }catch(e){
    console.log(`there was an error ${e} when updating a comment`);
  }
};
//delete comment
let deleteComment = async function(docID){
  try{
    await CommentModel.deleteOne({_id: docID});
  }catch(e){
    console.log(`there was an error ${e} when deleting a comment`);
  }
};

module.exports = {createComment,getComment,updateComment,deleteComment};