import React from 'react'

import './MyPosts.scss'

import MyPostItem from '../MyPostItem/MyPostItem'
import MyPostItemSkeleton from '../MyPostItem/MyPostItemSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import axios from '../../axios'

interface MyPostsProps {
   setOpenPost: Function
}

interface Post {
   _id: string,
   imageUrl: string;
}

const MyPosts = ({setOpenPost}: MyPostsProps) => {
   const [data, setData] = React.useState<Array<Post>>();
   const [isLoading, setIsLoading] = React.useState(true);

   const {id} = useParams()

   React.useEffect(() => {
      axios.get(`/post/profile/${id}`).then((res) => {
         setData(res.data)
         setIsLoading(false)
      })
   }, [id])
   
   // if (isLoading) {
   //    return [1,2,3].map(() => <MyPostItemSkeleton/>)
   // }

   return (
      <div className='myPosts'>
         {
            (isLoading ? [...Array(9)] : data!).map((obj, index) => 
            (
               isLoading ? (
                  <MyPostItemSkeleton key={index}/>
               ) : (
                  <MyPostItem setOpenPost={setOpenPost} key={index} id={obj._id} imageUrl={obj.imageUrl}/>
               )
            )
         )}
      </div>
      // <div className='myPosts'>
      //    { 
      //       data?.map((obj, index) => (
      //          <MyPostItem setOpenPost={setOpenPost} key={index} id={obj._id} imageUrl={obj.imageUrl}/>
      //       ))
      //    }
      // </div>
   )
}

export default MyPosts