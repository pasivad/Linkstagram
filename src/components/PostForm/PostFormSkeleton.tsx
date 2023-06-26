import React from 'react'
import { IoClose } from 'react-icons/io5'
import { AiFillHeart } from 'react-icons/ai'


import CommentItemSkeleton from '../CommentItem/CommentItemSkeleton'

import './PostForm.scss'
import { Link } from 'react-router-dom'


const PostFormSkeleton = () => {


   return (
      <div className='postForm'>
         <img className='skeleton skeleton-postImg' alt="" />
         <div className="postBody">
            <div className="postHeader">
               <img className='skeleton skeleton-postAuthor' alt="" />
               <div className="skeleton skeleton-authorName"></div>
               <Link to='/home' className='closeBtn'>
                  <IoClose />
               </Link>
            </div>
            <hr />
            <div className="postComments">
            {
               ([...Array(5)]).map((el, index) => (
                  <CommentItemSkeleton key={index}/>
               ))
            }
            </div>
            <hr />
            <div className="postStats">
               <button className={ "postLikeStats"}>
                  <AiFillHeart />
               </button>
               <div className="skeleton skeleton-postLikeNumber">
               </div>
            </div>
            <hr />
            <form action="post" className="commentForm">
               <input type="text" className="commentInput" placeholder='Add a comment...'/>
               <button className="postComment">Post</button>
            </form>
         </div>
      </div>
   )
}

export default PostFormSkeleton