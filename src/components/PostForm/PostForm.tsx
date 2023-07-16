import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { AiFillHeart } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { showPostForm } from '../../redux/slices/modals';

import axios, { socket } from '../../api/http';
import { createComment, createReply } from '../../api/requests';

import CommentItem from '../CommentItem/CommentItem';
import EmptyPostForm from './EmptyPostForm';

import './PostForm.scss';

interface Post {
  imageUrl: string;
  text: string;
  likes: number;
  user: {
    _id: string;
    userName: string;
    avatarUrl: string;
  };
  avatarUrl: string;
  comments: [
    {
      _id: string;
      text: string;
      likes: number;
      createdAt: Date;
      repliedComments: Array<{}>;
      user: {
        _id: string;
        userName: string;
        avatarUrl: string;
      };
    }
  ];
}

interface Comment {
  _id: string;
  text: string;
  likes: number;
  createdAt: Date;
  repliedComments: Array<{}>;
  user: {
    _id: string;
    userName: string;
    avatarUrl: string;
  };
}

interface UserProps {
  data: {
    _id: string;
    likes: string[];
  } | null;
  status: string;
}

const PostForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<Post>(Object);
  const [comments, setComments] = useState<Array<Comment>>(Array);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentValue, setCommentValue] = useState<string>('');
  const [replyCommentId, setReplyCommentId] = useState<string>('');
  const [userLikedComments, setUserLikedComments] = useState<Array<string>>(Array);

  const { id } = useParams();
  const navigate = useNavigate();

  const user: UserProps = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    socket.emit('receive-userLikes', user.data?._id);
    axios
      .get(`/post/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error getting post');
      });
  }, []);

  socket.on('receive-userComments', (comments) => {
    setComments(comments);
  });

  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(false);
  socket.on('send-userLikes', ({ likes, likedComments }) => {
    setIsLikedByUser(likes.includes(id));
    setUserLikedComments(likedComments);
  });

  const closePostForm = () => {
    dispatch(showPostForm());
    navigate(-1);
  };

  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(event.target.value);
  };

  const addComment = () => {
    socket.emit("send-postComments", id)
    setCommentValue('');
    setReplyCommentId('');
    if (replyCommentId)
      createReply({
        postId: id!,
        commentId: replyCommentId,
        commentValue,
        callback: () => {},
      });
    else
      createComment({
        id: id!,
        commentValue,
        callback: () => {},
      });
  };

  const stopReply = () => {
    setCommentValue('');
    setReplyCommentId('');
  };

  if (isLoading) {
    return <EmptyPostForm />;
  }

  return (
    <div className="postForm">
      <img src={data?.imageUrl} className="postImg" alt="" />
      <div className="postBody">
        <div className="postHeader">
          <Link to={`/profile/${data?.user._id}`} onClick={() => dispatch(showPostForm())}>
            <img src={data?.user.avatarUrl} className="postAuthor" alt="" />
          </Link>
          <Link to={`/profile/${data?.user._id}`} className="authorName" onClick={() => dispatch(showPostForm())}>
            {data?.user.userName}
          </Link>
          <button className="closeBtn" onClick={closePostForm}>
            <IoClose />
          </button>
        </div>
        <hr />
        <div className="postComments">
          {comments &&
            comments.map((comment, id) => (
              <CommentItem
                key={id}
                id={comment._id}
                userId={comment.user._id}
                userName={comment.user.userName}
                avatarUrl={comment.user.avatarUrl}
                likes={comment.likes}
                createdAt={comment.createdAt}
                text={comment.text}
                repliedComments={comment.repliedComments}
                userLikedComments={userLikedComments}
                setCommentValue={setCommentValue}
                setReplyCommentId={setReplyCommentId}
              />
            ))}
        </div>
        <hr />
        <div className="postStats">
          {isLikedByUser ? <AiFillHeart color="#FB766E" /> : <AiFillHeart />}
          <div className="postLikeNumber">{data.likes}</div>
        </div>
        <hr />
        <div className="commentForm">
          {replyCommentId && (
            <button className="stopReplying" onClick={stopReply}>
              Cancel Reply
            </button>
          )}
          <input
            type="text"
            value={commentValue}
            onChange={handleInputChanges}
            className="commentInput"
            placeholder="Add a comment..."
          />
          <button onClick={addComment} className="postComment">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
