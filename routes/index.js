var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const passport = require('passport');
const { getUserByEmail, createUser} = require('../controllers/user');
const {getPost, createPost, getAllPosts, updatePost, deletePost} = require('../controllers/post');
//blog api
router.get('/api', function(req, res, next) {
  res.json({message: 'welcome to the api'});
});

router.post('/api/login',async(req,res,next)=>{
  //test login attempt
  const e = 'a@a';
  const p = 'a';

  //login
  const user = await getUserByEmail(e);
  const match = await bcrypt.compare(p,user.password);
  if (match){
    const jwtPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      group: user.group,
      id: user._id
    }
    const token = jwt.sign(jwtPayload,process.env.SECRET);
    //http only is disabled so we can access the cookie value in the client
    res.cookie('jwt', token, { httpOnly: false, secure: true }).redirect('http://localhost:3000/');
  }else{
    res.json({status: 401});
  }
});

router.post('/api/signup',async(req,res,next)=>{
  let hashedPassword = null;
  try{
    hashedPassword = await bcrypt.hash('a',10)
  }catch(e){
    console.log(`there was an error ${e} when hashing a password`);
  }
  await createUser(
     'anthony',
     'test',
      'a@a',
      'admin',
      hashedPassword
  );
  res.json({message: 'user created successfully!'});
})

//get all posts
router.get('/api/posts/', async(req,res,next)=>{
  const postArray = await getAllPosts();
  res.json({postArray: postArray});
})
//get posts
router.get('/api/posts/:id', async(req,res,next)=>{
  const postID = req.params.id;
  const postObj = await getPost(postID);
  res.json({postObj: postObj});
});
//create post
//up to here the problem is that i can't access the req.body to retrieve data sent by the client
router.post('/api/posts', passport.authenticate('jwt',{session: false}),async(req,res,next)=>{
  try{
    await createPost(
      req.body.title,
      req.body.text,
      [],
      Date.now()
    )
    res.json({message: 'post created successfully!'});
  }catch(e){
    console.log(`there was an error ${e} when creating a new post`);
    res.json({message: 'error has occured when creating a new post'});
  }
});
//update post
router.put('/api/posts/:id',passport.authenticate('jwt',{session: false}),async(req,res,next)=>{
  const postID = req.params.id;
  try{
    const post = await updatePost(postID,{
      'title': 'test',
      'text': 'text',
      'comments': []
    });
    res.json({message: 'post updated successfully'});
  }catch(e){
    console.log(`there was an error ${$} when updating the post`);
    res.json({message: 'post created successfully'});
  }
});
router.delete('/api/posts/:id',passport.authenticate('jwt',{session: false}),async(req,res,next)=>{
  const postID = req.params.id;
  try{
    await deletePost(postID);
    res.json({message: 'post deleted successfully'});
  }catch(e){
    console.log(`there was an error ${e} when deleting the post`)
    res.json({message: 'post not deleted! an error has occured'});
  }
})
module.exports = router;