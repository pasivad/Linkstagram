import React from 'react'
import { BiCopyright } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

import './SidebarProfile.scss'
import avatar from '../../assets/images/profiles/profile.webp'

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


const SidebarProfileSkeleton = () => {
   const {t} = useTranslation()

   return (
      <div className='sidebarProfile'>
         <div className="sidebarHeader">
            <div className="sidebarFollowers">
               <span className='skeleton skeleton-followers'></span>
               {t("sidebar.followers")}
            </div>
            <div className="sidebarAvatar">
               <img src={avatar} alt="sidebarImg" className='sidebarImg'/>
               <button className="sidebarAvatarButton">
                  +
               </button>
            </div>
            <div className="sidebarFollowing">
               <span className='skeleton skeleton-followers'></span>
               {t("sidebar.following")}
            </div>
         </div>
         <div className="sidebarBody">
            <div className="sidebarProfileInfo">
               <div className="skeleton skeleton-sidebarName"></div>
                - 
               <div className="skeleton skeleton-sidebarJob"></div>
            </div>
            <div className="skeleton skeleton-sidebarAbout">
            </div>
            <div className="sidebarBodyButtons">
               <button className="editProfileButton">{t("sidebar.editProfile")}</button>
               <button className='newPostButton'>{t("sidebar.newPost")}</button>
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

export default SidebarProfileSkeleton