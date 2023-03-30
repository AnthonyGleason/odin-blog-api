import React from 'react';
import {useEffect,useState} from 'react';
import Cookies from 'js-cookie';

export default function PostContainer(){
  const [postsArr,setPostsArr] = useState();
  useEffect(()=>{
    fetch('http://localhost:5000/api/posts')
      .then((r)=>r.json())
      .then((r)=>{
        setPostsArr(r.postArray);
      })
  },[])
  if (postsArr){
    return(
      <div className='post-container'>
        {
          postsArr.map((i)=>{
            return(
              <div className='post' key={Math.random()}>
                <div className='title'>Post Title: {i.title}</div>
                <div className='text'>Post Text: {i.text}</div>
                <div className='timestamp'>Date Posted: {i.timestamp}</div>
                <button onClick={()=>{deletePost(i._id)}}>Delete</button>
                <div className='comments-container'>
                  {
                    i.comments.map((comment)=>{
                      return(
                        <div>
                          <div>{comment.timestamp}</div>
                          <div>{comment.createdBy}</div>
                          <div>{comment.text}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
        <form>
          <div>
            <label htmlFor='title'>Title: </label>
            <input id='title' name='title' />
          </div>
          <div>
            <label htmlFor='text'>Text: </label>
            <input id='text' name='text' />
          </div>
          <button type='button' onClick={()=>{createPost()}}>Create a post</button>
        </form>

        <form method='POST' action='http://localhost:5000/api/login'>
          <div>
            <label htmlFor='user'>Username: </label>
            <input id='user' name='user' type='email' />
          </div>
          <div>
            <label htmlFor='pass'>Pass: </label>
            <input id='pass' name='pass' type='password' />
          </div>
          <button type='submit'>Sign in</button>
        </form>
      </div>
    )
  }
}
let createPost = async function(){
  const title = document.querySelector('#title').value;
  const text = document.querySelector('#text').value;
  const jwt = Cookies.get('jwt');
  await fetch(`http://localhost:5000/api/posts/`,
  { 
    method: 'POST',
    headers: {
      //without the content-type header the server will see undefined for req.body
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body:JSON.stringify({
      title: title,
      text: text
    })
  })
}
let deletePost = async function(docID){
  const jwt = Cookies.get('jwt');
  await fetch(`http://localhost:5000/api/posts/${docID}`,
  { 
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  })
}
