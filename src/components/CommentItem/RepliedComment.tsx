import React, { useState, memo } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { likeCommentRequest, unlikeCommentRequest } from '../../api/requests';
import { getDateValues } from '../../utils/date';

import './CommentItem.scss';

interface CommentsProps {
  id: string;
  userId: string;
  avatarUrl: string;
  likes: number;
  text: string;
  createdAt: Date;
  userLikedComments: Array<string>;
}

const RepliedComment = ({ id, userId, avatarUrl, likes, createdAt, text, userLikedComments }: CommentsProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(userLikedComments.includes(id));
  const [updatedLikes, setUpdatedLikes] = useState<number>(likes);

  const passedDate = getDateValues(createdAt);
  let passedTime = '';
  for (const [key, value] of Object.entries(passedDate)) {
    if (value !== 0) {
      passedTime = `${value} ${key === 'months' ? key.substring(0, 3) : key.charAt(0)}.`;
      break;
    }
  }

  const handleLikeClick = () => {
    likeCommentRequest({
      id,
      callback: () => {
        setIsLiked(true);
        setUpdatedLikes(updatedLikes! + 1);
      },
    });
  };
  const handleUnlikeClick = () => {
    unlikeCommentRequest({
      id,
      callback: () => {
        setIsLiked(false);
        setUpdatedLikes(updatedLikes! - 1);
      },
    });
  };
  return (
    <div className="commentItem commentItem--reply">
      <Link to={`/profile/${userId}`}>
        <img src={avatarUrl} className="commentAuthor" alt="avatar"></img>
      </Link>
      <div className={`commentBody`}>
        {text.split(' ')[0].charAt(0) === '@' ? (
          <>
            <span>{text.split(' ')[0]}</span>
            {text.substring(text.split(' ')[0].length, text.length)}
          </>
        ) : (
          text
        )}
        <div className="commentFooter">
          <div className="commentTime">{passedTime}</div>
          <div className="commentLikeStats">{`${updatedLikes} likes`}</div>
        </div>
      </div>
      {!isLiked ? (
        <button className="commentLike" onClick={handleLikeClick}>
          <AiFillHeart />
        </button>
      ) : (
        <button className="commentLike commentLike--liked" onClick={handleUnlikeClick}>
          <AiFillHeart />
        </button>
      )}
    </div>
  );
};

export default memo(RepliedComment);
