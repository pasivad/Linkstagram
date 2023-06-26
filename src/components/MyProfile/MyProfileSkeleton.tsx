import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'

import './MyProfile.scss'
import avatar from '../../assets/images/profiles/profile.webp'


const MyProfileSkeleton = () => {
   const {t} = useTranslation()

   return (
      <div className='myProfile'>

         <div className="myProfileAvatar">
            <img src={avatar} className='myProfileImg'/>
         </div>

         <div className="myProfileBody">
            <div className="myProfileDetails">
               <div className="skeleton skeleton-myProfileName"></div>
                - 
               <div className="skeleton skeleton-myProfileJob"></div>
            </div>
            <div className="skeleton skeleton-myProfileAbout">
               
            </div>
         </div>

         <div className="myProfileInfo">
            <div className="myProfileFollows">
               <div className="myProfileFollowers">
                  <span className='skeleton skeleton-myProfileFollows'></span>
                  {t("sidebar.followers")}
               </div>
               <div className="myProfileFollowing">
                  <span className='skeleton skeleton-myProfileFollows'></span>
                  {t("sidebar.following")}
               </div>
            </div>

         </div>

      </div>
   )
}

export default MyProfileSkeleton