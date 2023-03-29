const UserModel = require('../models/User');

//create a new user
let createUser = async function(firstName,lastName,email, group){
  try{
    const user = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      group: group,
    });
    return user;
  }catch(e){
    console.log(`there was an error ${e} when creating a new user`);
  }
};
//get a user by doc id
let getUserById = async function(docID){
  try{
    const user = await UserModel.findById(docID);
    return user;
  }catch(e){
    console.log(`there was an error ${e} when getting the user`);
  }
};
//update a user
let updateUser = async function(docID, updatedUser){
  try{
    const user = await UserModel.findByIdAndUpdate(docID, updatedUser);
    return user;
  }catch(e){
    console.log(`there was an error ${e} when updating a user`);
  }
};
//delete a user
let deleteUser = async function(docID){
  try{
    await UserModel.findByIdAndDelete(docID);
  }catch(e){
    console.log(`there was an error ${e} when deleting a user`);
  }
};

module.exports =  {createUser,getUserById,updateUser,deleteUser};