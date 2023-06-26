import React from "react";
import { AiFillHeart } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'

import "./Card.scss";

export const CardSkeleton = () => {
  return (
   <div className='cardItem'>
   <div className='cardHeader'>
      <img className='skeleton skeleton-cardAvatar'></img>
      <div className="cardHeaderInfo">
         <div className="skeleton skeleton-cardName"></div>
         <div className="cardTime">Loading...</div>
      </div>
      <a href="#" className='cardSettings'>...</a>
   </div>
   <div className="cardBody">
      <img className="skeleton skeleton-cardPhoto"></img>
      <div className="skeleton skeleton-cardText"></div>
   </div>
   <div className="cardFooter">
      <div className="likes">
         <AiFillHeart />
         <span></span> 
      </div>
      <div className="comments">
         <FaRegCommentDots />
         <span></span>
      </div>
      <button className='shareButton'>
         Share
         <BsArrowRight />
         </button>
   </div>
</div>
  );
};