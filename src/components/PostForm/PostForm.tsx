import React from 'react';
import axios from '../../axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { AiFillHeart } from 'react-icons/ai';

import post from '../../assets/images/posts/post2.jfif';
import profile from '../../assets/images/profiles/profile1.png';

import CommentItem from '../CommentItem/CommentItem';

import './PostForm.scss';
import { idText } from 'typescript';
import { Link } from 'react-router-dom';
import PostFormSkeleton from './PostFormSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { getValue } from '@testing-library/user-event/dist/utils';
import { fetchLoginMe } from '../../redux/slices/user';

interface PostFormProps {
   setModal: Function;
}

interface Post {
   imageUrl: string;
   text: String;
   likes: number;
   user: {
      _id: string,
      userName: String;
      avatarUrl: string;
   };
   avatarUrl: string;
   comments: [
      {
         _id: String;
         text: String;
         likes: number;
         replyStatus: Boolean;
         createdAt: string;
         user: {
            _id: string,
            avatarUrl: string;
         };
      }
   ];
}

interface UserProps {
   data: {
      likes: string[];
   } | null;
   status: string;
}

const PostForm = ({ setModal }: PostFormProps) => {
   const [data, setData] = React.useState<Post>(Object);
   const [isLoading, setIsLoading] = React.useState(true);
   const [comment, setComment] = React.useState("");
   const [addedComment, setAddedComment] = React.useState(false);


   const { id } = useParams();
   console.log(id)
   const navigate = useNavigate();

   const [updateLikes, setUpdatedLikes] = React.useState(0);

   const dispatch = useDispatch<AppDispatch>()
   React.useEffect(() => {
      dispatch(fetchLoginMe())
      axios
         .get(`/post/${id}`)
         .then((res) => {
            setData(res.data);
            setIsLoading(false);
            setComment("")
         })
         .catch((err) => {
            console.warn(err);
            alert('Error getting post');
         });
   }, [addedComment]);

   const user: UserProps = useSelector((state: RootState) => state.user);
   const [isLiked, setIsLiked] = React.useState(user.data?.likes.includes(id!) ? true : false);

   const [like, setLike] = useState(false);

   const closePostForm = () => {
      setModal(false);
      navigate(-1);
   };

   const handleLikeClick = () => {
      try {
         axios.patch(`/user/like/${id}`);
         setIsLiked(true);
         setUpdatedLikes(updateLikes! + 1);
      } catch (err) {
         console.warn('Failed to like post');
      }
   };
   const handleUnLikeClick = () => {
      try {
         axios.patch(`/user/unlike/${id}`);
         setIsLiked(false);
         setUpdatedLikes(updateLikes! - 1);
      } catch (err) {
         console.warn('Failed to unlike post');
      }
   };

   const handleInputChanges = (event: any) => {
      setComment(event.target.value);
   };

   const createComment = async () => {
      try {
         axios.post(`/comment/${id}`, {text: comment}).then(() => {
            setAddedComment(true)
         });
      } catch (err) {
         console.warn(err)
         alert('Failed to comment')
      }
   };

   if (isLoading) {
      return <PostFormSkeleton />;
   }

   return (
      <div className="postForm">
         <img src={data.imageUrl} className="postImg" alt="" />
         <div className="postBody">
            <div className="postHeader">
               <Link to={`/profile/${data.user._id}`}>
                  <img src={data.user.avatarUrl} className="postAuthor" alt="" />
               </Link>
               <Link to={`/profile/${data.user._id}`} className="authorName">{data.user.userName}</Link>
               <button className="closeBtn" onClick={closePostForm}>
                  <IoClose />
               </button>
            </div>
            <hr />
            <div className="postComments">
               {data.comments &&
                  data.comments.map((comment, id) => (
                     <CommentItem
                        key={id}
                        id={comment._id}
                        userId={comment.user._id}
                        avatarUrl={comment.user.avatarUrl}
                        likes={comment.likes}
                        createdAt={comment.createdAt}
                        text={comment.text}
                     />
                  ))}
            </div>
            <hr />
            <div className="postStats">
               {!isLiked ? (
                  <button className="postLikeStats">
                     <AiFillHeart />
                  </button>
               ) : (
                  <button className="postLikeStats postLikeStats--liked">
                     <AiFillHeart />
                  </button>
               )}

               <div className="postLikeNumber">{data.likes}</div>
            </div>
            <hr />
            <div className="commentForm">
               <input
                  type="text"
                  value={comment}
                  onChange={handleInputChanges}
                  className="commentInput"
                  placeholder="Add a comment..."
               />
               <button onClick={createComment} className="postComment">
                  Post
               </button>
            </div>
         </div>
      </div>
   );
};

export default PostForm;
