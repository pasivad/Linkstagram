import React from 'react';
import { IoClose } from 'react-icons/io5';
import { AiFillHeart } from 'react-icons/ai';

import EmptyComment from '../CommentItem/EmptyComment';

import './PostForm.scss';

const EmptyPostForm = () => {
  return (
    <div className="postForm">
      <img className="skeleton skeleton-postImg" alt="" />
      <div className="postBody">
        <div className="postHeader">
          <img className="skeleton skeleton-postAuthor" alt="" />
          <div className="skeleton skeleton-authorName"></div>
          <button className="closeBtn">
            <IoClose />
          </button>
        </div>
        <hr />
        <div className="postComments">
          {[...Array(5)].map((el, index) => (
            <EmptyComment key={index} />
          ))}
        </div>
        <hr />
        <div className="postStats">
          <AiFillHeart />
          <div className="skeleton skeleton-postLikeNumber"></div>
        </div>
        <hr />
        <form action="post" className="commentForm">
          <input type="text" className="commentInput" placeholder="Add a comment..." />
          <button className="postComment">Post</button>
        </form>
      </div>
    </div>
  );
};

export default EmptyPostForm;
