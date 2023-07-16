import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';

import './Card.scss';

const EmptyCard = () => {
  return (
    <div className="cardItem">
      <div className="cardHeader">
        <div className="skeleton skeleton-cardAvatar"></div>
        <div className="cardHeaderInfo">
          <div className="skeleton skeleton-cardName"></div>
          <div className="cardTime">Loading...</div>
        </div>
        <div className="cardSettings">...</div>
      </div>
      <div className="cardBody">
        <div className="skeleton skeleton-cardPhoto"></div>
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
        <button className="shareButton">
          Share
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default EmptyCard;
