import React, { useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiCopyright } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

import './SidebarProfile.scss'
import avatar from '../../assets/images/profiles/profile2.png'
import Modal from '../Modal/Modal'
import EditProfileForm from '../EditProfileForm/EditProfileForm'
import NewPostForm from '../NewPostForm/NewPostForm'
import { useSelector } from 'react-redux'
import type {  RootState } from '../../redux/store'
import SidebarProfileSkeleton from './SidebarProfileSkeleton'
import axios from '../../axios'



interface SidebarProfileProps {
   setEditProfileModal: Function
   setNewPostModal: Function
}

interface UserProps {
   data: {
      userName: String,
      avatarUrl: string,
      followers: Number,
      following: Number,
      job: String,
      description: String
   } | null,
   status: string
}


const SidebarProfile = ({setEditProfileModal, setNewPostModal}: SidebarProfileProps) => {
   const {t} = useTranslation()

   const inputAvatarRef = React.useRef<HTMLInputElement>(null)

   const user:UserProps = useSelector((state:RootState) => state.user)

   const isPostsLoading = user.status === 'loading'

   const handleChangeAvatar = async (event:any) => {
      try {
         let formData = new FormData()
         formData.append('avatarUrl', event.target.files[0])
         const data = axios.patch('/user/avatar', formData)
         .then(res => {window.location.reload()})

      } catch (err) {
         console.warn('Failed to load an avatar')
         alert('Failed to load an avatar')
      }
   }

   if (isPostsLoading) return (<SidebarProfileSkeleton />)
   return (
      <div className='sidebarProfile'>
         <div className="sidebarHeader">
            <div className="sidebarFollowers">
               <span>{user.data?.followers.toString()}</span>
               {t("sidebar.followers")}
            </div>
            <div className="sidebarAvatar">
               <img src={user.data?.avatarUrl} className='sidebarImg'/>
               <input ref={inputAvatarRef} type="file" onChange={handleChangeAvatar} hidden></input>
               <button onClick={() => inputAvatarRef?.current?.click()} className="sidebarAvatarButton">
                  +
               </button>
            </div>
            <div className="sidebarFollowing">
               <span>{user.data?.following.toString()}</span>
               {t("sidebar.following")}
            </div>
         </div>
         <div className="sidebarBody">
            <div className="sidebarProfileInfo">
               <div className="sidebarName">{user.data?.userName}</div>
                - 
               <div className="sidebarJob">{user.data?.job}</div>
            </div>
            <div className="sidebarAbout">
               {user.data?.description}
            </div>
            <div className="sidebarBodyButtons">
               <button onClick={() => setEditProfileModal(true)} className="editProfileButton">{t("sidebar.editProfile")}</button>
               <button onClick={() => setNewPostModal(true)} className='newPostButton'>{t("sidebar.newPost")}</button>
            </div>
         </div>
         <div className="sidebarFooter">
            <div className="sidebarLinks">
               <a href="#" className='sidebarLinksItem'>About</a>
               <a href="#" className='sidebarLinksItem'>Help</a>
               <a href="#" className='sidebarLinksItem'>Privacy</a>
               <a href="#" className='sidebarLinksItem'>Terms</a>
               <a href="#" className='sidebarLinksItem'>Location</a>
               <a href="#" className='sidebarLinksItem'>Language</a>
            </div>
            <div className="sidebarCopyright">
               <BiCopyright />
               2023 Linkstagram
            </div>
         </div>
      </div>
   )
}

export default SidebarProfile