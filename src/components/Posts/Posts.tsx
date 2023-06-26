import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Posts.scss'

import StorySlider from '../StorySlider/StorySlider'
import Card from '../Card/Card'

import type { AppDispatch, RootState } from '../../redux/store'
import { fetchPosts } from '../../redux/slices/posts'
import { CardSkeleton } from '../Card/CardSkeleton'

interface PostsProps {
   setOpenStory: Function
   setOpenPost: Function 
}

const Posts = ({setOpenStory, setOpenPost}: PostsProps) => {
   const dispatch = useDispatch<AppDispatch>()
   const { posts } = useSelector((state:RootState) => state.posts)

   const isPostsLoading = posts.status === 'loading'

   React.useEffect(()=> {
      dispatch(fetchPosts())
   }, [])

   const obj:any = (posts.items[0])

   const date = new Date().toISOString()

   return (
      <div className='posts'>
         <StorySlider setOpenStory={setOpenStory}/>
         { (isPostsLoading ? [...Array(3)] : posts.items).map((obj, index) => 
         (
            isPostsLoading ? 
            (
               <CardSkeleton key={index}/>
            ) : 
            (
               <Card setOpenPost={setOpenPost} key={index} id={obj._id} userId={obj.user._id} avatar={obj.user.avatarUrl} name={obj.user.userName} postImg={obj.imageUrl} text={obj.text} likes={obj.likes} commentsNumber={obj.commentsNumber} date ={(new Date(Date.parse(date) - Date.parse(obj.createdAt))).toString()}/>

            )
         ))
         }
      </div>
   )
}

export default Posts