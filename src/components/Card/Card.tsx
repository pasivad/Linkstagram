import React, { memo, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ReadMoreAndLess from 'react-read-more-less';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { showPostForm } from '../../redux/slices/modals';
import { likePostRequest, unlikePostRequest } from '../../api/requests';
import { socket } from '../../api/http';
import { getDateValues } from '../../utils/date';

import './Card.scss';

interface CardProps {
  id: string;
  userId?: string;
  avatar?: string;
  name?: string;
  postImg?: string;
  text?: string;
  likes: number;
  commentsNumber: number;
  date: Date;
}

interface UserProps {
  data: {
    likes: string[];
  } | null;
  status: string;
}

const Card = ({ id, userId, avatar, name, postImg, text, likes, commentsNumber, date }: CardProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [updateLikes, setUpdateLikes] = useState<number>(likes);
  const [updateComments, setUpdateComments] = useState<number>(commentsNumber);

  const user: UserProps = useSelector((state: RootState) => state.user);
  const [isLikedByUser, setIsLikedByUser] = useState<boolean | undefined>(user.data?.likes.includes(id!));

  socket.on('receive-comments', ({postId, commentsNumber}) => {
    if (postId === id) setUpdateComments(commentsNumber)
  });

  // Get Date
  const passedDate = getDateValues(date);
  let passedTime = '';
  for (const [key, value] of Object.entries(passedDate)) {
    if (value !== 0) {
      passedTime = `${value} ${key} ago.`;
      break;
    }
  }

  const handleLikeClick = () => {
    likePostRequest({
      id,
      callback: () => {
        setIsLikedByUser(true);
        setUpdateLikes(updateLikes! + 1);
      },
    });
  };
  const handleUnLikeClick = () => {
    unlikePostRequest({
      id,
      callback: () => {
        setIsLikedByUser(false);
        setUpdateLikes(updateLikes! - 1);
      },
    });
  };

  return (
    <div className="cardItem">
      <div className="cardHeader">
        <Link to={`/profile/${userId}`}>
          <img className="cardAvatar" src={avatar} alt="avatar"></img>
        </Link>
        <div className="cardHeaderInfo">
          <Link to={`/profile/${userId}`} className="cardName">
            {name}
          </Link>
          <div className="cardTime">{passedTime}</div>
        </div>
        <div className="cardSettings">...</div>
      </div>
      <div className="cardBody">
        <img className="cardPhoto" src={postImg} alt="post"></img>
        <div className="cardText">
          <ReadMoreAndLess className="read-more-content" charLimit={150} readMoreText="Show" readLessText={null}>
            {text}
          </ReadMoreAndLess>
        </div>
      </div>
      <div className="cardFooter">
        <div className="likes">
          {isLikedByUser ? (
            <AiFillHeart color="#FB766E" onClick={handleUnLikeClick} />
          ) : (
            <AiFillHeart onClick={handleLikeClick} />
          )}
          <span>{updateLikes}</span>
        </div>
        <Link onClick={() => dispatch(showPostForm())} to={`/home/${id}`} className="comments">
          <FaRegCommentDots />
          <span>{updateComments}</span>
        </Link>
        <button className="shareButton">
          {t('post.postShare')}
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Card;
