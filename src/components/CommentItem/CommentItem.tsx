import React from 'react'
import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'

import author from '../../assets/images/profiles/profile2.png'

import './CommentItem.scss'
import axios from '../../axios'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { Link } from 'react-router-dom'


interface CommentsProps {
   id: String,
   userId: String,
   avatarUrl: string,
   likes: number,
   createdAt: string,
   text: String
}

interface UserProps {
   data: {
      likedComments: Array<String>
   } | null
   status: String
}

const CommentItem = ({id, userId, avatarUrl, likes, createdAt, text}: CommentsProps) => {

   const user: UserProps = useSelector((state: RootState) => state.user);

   const [isLiked, setIsLiked] = React.useState(user.data?.likedComments.includes(id) ? true : false);
   const [updatedLikes, setUpdatedLikes] = useState(likes)
   console.log(isLiked, user.data?.likedComments, id)

   // Formattig date 
   const todayDate = new Date()
   const createdDate = new Date(createdAt)
   const passedTime = new Date(todayDate.valueOf()-createdDate.valueOf())
   const [month, day, year] = [
      passedTime.getMonth(),
      passedTime.getDate()-1,
      new Date().getFullYear()
   ];
   const [hour, minutes, seconds] = [
      passedTime.getHours()-3,
      passedTime.getMinutes(),
      passedTime.getSeconds(),
   ];


   const handleLikeClick = () => {
      try {
         axios.patch(`/user/likecom/${id}`)
         setIsLiked(true)
         setUpdatedLikes(updatedLikes!+1)
      } catch (err) {
         console.warn('Failed to like post')
      }
   }
   const handleUnLikeClick = () => {
      try {
         axios.patch(`/user/unlikecom/${id}`)
         setIsLiked(false)
         setUpdatedLikes(updatedLikes!-1)
      } catch (err) {
         console.warn('Failed to unlike post')
      }
   }


   return (
      <div className={`commentItem`}>
         <Link to={`/profile/${userId}`}>
            <img src={avatarUrl} className="commentAuthor"></img>
         </Link>
         <div className={`commentBody`}>
         {text}
            <div className="commentFooter">
               <div className="commentTime">{`
               ${month ? (month + " mon.") : 
               day ? (day + " d.") : 
               hour ? (hour + " h.") : 
               minutes ? (minutes + " min.") : 
               seconds ? (seconds + " sec.") : ""}`}</div>
               <div className="commentLikeStats">{`${updatedLikes} likes`}</div>
               <button className="commentReply">Reply</button>
            </div>
         </div>
         {
            !isLiked ? 
            (
               <button className="commentLike" onClick={handleLikeClick}>
                  <AiFillHeart />
               </button>
            ) :
            (
               <button className="commentLike commentLike--liked" onClick={handleUnLikeClick}>
                  <AiFillHeart />
               </button>
            )
         }
      </div>
   )
}

export default CommentItem