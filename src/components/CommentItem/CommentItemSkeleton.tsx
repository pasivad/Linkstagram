import React from 'react'
import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'

import author from '../../assets/images/profiles/profile2.png'

import './CommentItem.scss'


const CommentItemSkeleton = () => {

   return (
      <div className={'commentItem'}>
         <img className="skeleton skeleton-commentAuthor"></img>
         <div className={'skeleton skeleton-commentBody'}>
            <div className="commentFooter">
               <div className="commentTime"></div>
               <div className="commentLikeStats"></div>
               <button className="commentReply"></button>
            </div>
         </div>
         <button className={"commentLike"}>
            <AiFillHeart />
         </button>
      </div>
   )
}

export default CommentItemSkeleton