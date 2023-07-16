import React, { useState, memo } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { showPostForm } from '../../redux/slices/modals';
import axios from '../../api/http';
import { likeCommentRequest, unlikeCommentRequest } from '../../api/requests';
import { getDateValues } from '../../utils/date';

import RepliedComment from './RepliedComment';

import './CommentItem.scss';

interface CommentsProps {
  id: string;
  userId: string;
  userName: string;
  avatarUrl: string;
  likes: number;
  text: string;
  createdAt: Date;
  repliedComments: Array<{}>;
  userLikedComments: Array<string>;
  setCommentValue: (arg0: string) => void;
  setReplyCommentId: (arg0: string) => void;
}

interface ReplyCommentProps {
  _id: string;
  likes: number;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    avatarUrl: string;
  };
}

const CommentItem = ({
  id,
  userId,
  userName,
  avatarUrl,
  likes,
  createdAt,
  text,
  repliedComments,
  userLikedComments,
  setCommentValue,
  setReplyCommentId,
}: CommentsProps) => {
  const dispatch = useDispatch();

  const [replies, setReplies] = useState<Array<ReplyCommentProps>>();
  const [openReplies, setOpenReplies] = useState<boolean>(false);

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
  React.useEffect(() => {
    if (repliedComments.length > 0) {
      axios
        .get(`/comment/reply/${id}`)
        .then((res) => {
          setReplies(res.data);
        })
        .catch((err) => {
          console.warn('Failed to get Replies');
        });
    }
  }, [repliedComments]);

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
  const handleReplyClick = () => {
    setReplyCommentId(id);
    setCommentValue(`@${userName} `);
  };

  return (
    <div className="commentBlock">
      <div className="commentItem">
        <Link to={`/profile/${userId}`} onClick={() => dispatch(showPostForm())}>
          <img src={avatarUrl} className="commentAuthor" alt="avatar"></img>
        </Link>
        <div className={`commentBody`}>
          {text}
          <div className="commentFooter">
            <div className="commentTime">{passedTime}</div>
            <div className="commentLikeStats">{`${updatedLikes} likes`}</div>
            <button className="commentReply" onClick={handleReplyClick}>
              Reply
            </button>
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
      {repliedComments.length > 0 && (
        <button className="openReplies" onClick={() => setOpenReplies(!openReplies)}>
          {openReplies ? 'Hide replies' : `Show replies (${repliedComments.length.toString()})`}
        </button>
      )}
      {openReplies &&
        replies?.map((replyComment, index) => (
          <RepliedComment
            key={index}
            id={replyComment._id}
            userId={replyComment.user._id}
            avatarUrl={replyComment.user.avatarUrl}
            likes={replyComment.likes}
            userLikedComments={userLikedComments}
            createdAt={replyComment.createdAt}
            text={replyComment.text}
          />
        ))}
    </div>
  );
};

export default memo(CommentItem);
