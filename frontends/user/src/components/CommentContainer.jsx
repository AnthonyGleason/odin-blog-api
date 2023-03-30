import React, { useEffect, useState } from 'react';

export default function CommentContainer({ post }) {
  const comments = post.comments;
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    getComments(setCommentData,comments,post);
  }, []);
  
  return(
    <div>
      {
        renderComments(commentData)
      }
    </div>
  )
}
const renderComments = (commentData) => {
  return(
    <div>
      {
        commentData.map((c)=>{
          let comment = c.comment;
          return(
            <div key={Math.random()}>
              {comment.text}
              <div>Date: {comment.timestamp}</div>
              <div>Comment Created By: {comment.createdBy}</div>
              <div>Comment Text: {comment.text}</div>
            </div>
          )
        })
      }
    </div>
  )
};

let getComment = async function (postID, commentID) {
  const response = await fetch(
    `http://localhost:5000/api/posts/${postID}/${commentID}`
  );
  const comment = await response.json();
  return comment;
};

const getComments = async (setCommentData,comments,post) => {
  const commentPromises = comments.map((c) => getComment(post._id, c));
  const commentDataArr = await Promise.all(commentPromises);
  setCommentData(commentDataArr);
};