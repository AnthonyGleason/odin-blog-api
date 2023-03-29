const PostModel = require('../models/Post');

//create post
let createPost = async function (title,text,comments,timestamp){
  try{
    const post = await PostModel.create({
      title: title,
      text: text,
      comments: comments,
      timestamp: timestamp
    })
    return post;
  }catch(e){
    console.log(`there was an error ${e} when creating a post`);
  }
}
//get a post by id
let getPost = async function (docID){
  try{
    const post = await PostModel.findById(docID);
    return post;
  }catch(e){
    console.log(`there was an error ${e} when getting the post`);
  }
}
//get all posts
let getAllPosts = async function(){
  try{
    const allPosts = await PostModel.find({});
    return allPosts;
  }catch(e){
    console.log(`There was an error ${e} when getting all posts`);
  }
}
//update a post by id
let updatePost = async function (docID,updatedPost){
  try{
    const post = await PostModel.findByIdAndUpdate(docID,updatedPost);
    return post;
  }catch(e){
    console.log(`there was an error ${e} when updating the post`);
  }
}
//delete a post by id
let deletePost = async function (docID){
  try{
    await PostModel.findByIdAndDelete(docID);
  }catch(e){
    console.log(`there was an error ${e} when deleting the post`);
  }
}
module.exports = {createPost,getPost,getAllPosts,updatePost,deletePost};