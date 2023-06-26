import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'

import './MyProfile.scss'
import MyProfileSkeleton from './MyProfileSkeleton'
import axios from '../../axios'
import { useParams } from 'react-router-dom'

interface MyProfileProps {
   setEditProfileModal: Function,
   setNewPostModal: Function
}

interface UserProps {
   _id: String,
   userName: String,
   avatarUrl: string,
   followers: Number,
   following: Number,
   job: String,
   description: String
}

interface MyProps {
   data: {
      _id: String
   } | null
   status: String
}

const MyProfile = ({setEditProfileModal, setNewPostModal}: MyProfileProps) => {
   const {t} = useTranslation()
   const [data, setData] = useState<UserProps>(Object)
   const [isLoading, setIsLoading] = useState(true)

   const {id} = useParams()
   const user:MyProps = useSelector((state:RootState) => state.user)

   React.useEffect(() => {
      axios.get(`/user/${id}`).then((res) => {
         setData(res.data)
         setIsLoading(false)
      })
   }, [id])

   if (isLoading) return (<MyProfileSkeleton />)

   return (
      <div className='myProfile'>

         <div className="myProfileAvatar">
            <img src={data?.avatarUrl} alt="myProfileImg" className='myProfileImg'/>
         </div>

         <div className="myProfileBody">
            <div className="myProfileDetails">
               <div className="myProfileName">{data?.userName}</div>
                - 
               <div className="myProfileJob">{data?.job}</div>
            </div>
            <div className="myProfileAbout">
               {data?.description}
            </div>
         </div>

         <div className="myProfileInfo">
            <div className="myProfileFollows">
               <div className="myProfileFollowers">
                  <span>{data?.followers.toString()}</span>
                  {t("sidebar.followers")}
               </div>
               <div className="myProfileFollowing">
                  <span>{data?.following.toString()}</span>
                  {t("sidebar.following")}
               </div>
            </div>
            {
               user.data?._id === id && 
               (<div className="myProfileButtons">
                  <button onClick={() => setEditProfileModal(true)} className="myProfileEditButton">{t("sidebar.editProfile")}</button>
                  <button onClick={() => setNewPostModal(true)} className='myProfileNewPostButton'>{t("sidebar.newPost")}</button>
               </div>)
            }
         </div>

      </div>
   )
}

export default MyProfile