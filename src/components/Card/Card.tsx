import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

import { CardSkeleton } from './CardSkeleton'

import './Card.scss'

import post from '../../assets/images/posts/post1.png'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'


interface CardProps {
   setOpenPost: Function,
   id?: string,
   userId?: string,
   avatar?: string,
   name?: String,
   postImg?: string,
   text?: String,
   likes?: number,
   commentsNumber?: Number,
   date: string,
   isLoading?: Boolean,
}

interface UserProps {
   data: {
      likes: string[]
   } | null
   status: string
}

const Card = ({setOpenPost, id, userId, avatar, name, postImg, text, likes, commentsNumber, isLoading, date}: CardProps) => {
   const {t} = useTranslation()

   const user:UserProps = useSelector((state:RootState) => state.user)
   const [isLiked, setIsLiked] = React.useState(user.data?.likes.includes(id!) ? true : false)
   const [updateLikes, setUpdatedLikes] = React.useState(likes)

   // Get Date
   const dateDate = new Date(Date.parse(date))
   const [month, day, year] = [
      dateDate.getMonth(),
      dateDate.getDate()-1,
      new Date().getFullYear()
   ];
   const [hour, minutes, seconds] = [
      dateDate.getHours()-3,
      dateDate.getMinutes(),
      dateDate.getSeconds(),
   ];

   const handleLikeClick = () => {
      try {
         axios.patch(`/user/like/${id}`)
         setIsLiked(true)
         setUpdatedLikes(updateLikes!+1)
      } catch (err) {
         console.warn('Failed to like post')
      }
   }
   const handleUnLikeClick = () => {
      try {
         axios.patch(`/user/unlike/${id}`)
         setIsLiked(false)
         setUpdatedLikes(updateLikes!-1)
      } catch (err) {
         console.warn('Failed to unlike post')
      }
   }

   if (isLoading) {
      return <CardSkeleton />;
   }


   return (
      <div className='cardItem'>
         <div className='cardHeader'>
            <Link to={`/profile/${userId}`}>
               <img className='cardAvatar' src={avatar ? avatar : ""}></img>
            </Link>
            <div className="cardHeaderInfo">
               <Link to={`/profile/${userId}`} className="cardName">{name}</Link>
               <div className="cardTime">{`
               ${month ? (month + " Months") : 
               day ? (day + " Days") : 
               hour ? (hour + " Hours") : 
               minutes ? (minutes + " Minutes") : 
               seconds ? (seconds + " Seconds") : ""} ago.`}</div>
            </div>
            <a href="#" className='cardSettings'>...</a>
         </div>
         <div className="cardBody">
            <img className="cardPhoto" src={postImg} alt='post'></img>
            <div className="cardText">{text}</div>
         </div>
         <div className="cardFooter">
            <div className="likes">
               {
                  !isLiked ? 
                     <AiFillHeart onClick={handleLikeClick} /> :
                     <AiFillHeart color='#FB766E' onClick={handleUnLikeClick} />
               }
                  <span>{updateLikes}</span> 
            </div>
            <Link onClick={() => setOpenPost(true)} to={`/home/${id}`} className="comments">
               <FaRegCommentDots />
               <span>{commentsNumber?.toString()}</span>
            </Link>
            <button className='shareButton'>
               {t("post.postShare")}
               <BsArrowRight />
               </button>
         </div>
      </div>
   )
}

export default Card