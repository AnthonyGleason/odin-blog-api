import React from 'react';
import {useEffect,useState} from 'react';
import CommentContainer from './CommentContainer';

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
                <CommentContainer post={i} />
                <form method='POST' action={`http://localhost:5000/api/posts/${i._id}/comment`}>
                  <div>
                    <label htmlFor='text'>Comment: </label>
                    <input id='text' name='text'/>
                  </div>
                  <div>
                    <label htmlFor='name'>Username: </label>
                    <input id='name' name='name'/>
                  </div>
                  <button type='submit'>Create Comment</button>
                </form>
              </div>
            )
          })
        }
      </div>
    )
  }
}