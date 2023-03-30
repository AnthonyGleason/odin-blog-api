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
              </div>
            )
          })
        }
        <form method='POST' action='http://localhost:5000/api/posts'>
          <div>
            <label htmlFor='title'>Title: </label>
            <input id='title' name='title' />
          </div>
          <div>
            <label htmlFor='text'>Text: </label>
            <input id='text' name='text' />
          </div>
          <button type='submit'>Create a post</button>
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
let deletePost = async function(docID){
  const jwt = Cookies.get('jwt');
  console.log(jwt);
  await fetch(`http://localhost:5000/api/posts/${docID}`,
  { 
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  })
}
