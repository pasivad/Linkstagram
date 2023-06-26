import React from 'react'

import './MyPostItem.scss'
import post from '../../assets/images/posts/post2.jfif'
import { Link } from 'react-router-dom'

interface MyPostItemProps {
   setOpenPost: Function,
   id?: String,
   imageUrl?: string
}

const MyPostItem = ({setOpenPost, id, imageUrl}: MyPostItemProps) => {

   return (
      <Link onClick={() => setOpenPost(true)} to={`${id}`} className='myPostItem'>
         <img src={imageUrl} alt="myPostItem" className='myPostImg'/>
      </Link>
   )
}

export default MyPostItem