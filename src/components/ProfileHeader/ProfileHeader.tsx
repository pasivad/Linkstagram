import React from 'react'

import avatar from '../../assets/images/profiles/profile.webp';

import './ProfileHeader.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

interface UserProps {
   data: {
      _id: String,
      avatarUrl: string,
   } | null,
   status: string
}

const ProfileHeader = () => {
   const user:UserProps = useSelector((state:RootState) => state.user)

   const isUserLoading = user.status === 'loading'

   return (
      <Link to={`/profile/${user.data?._id}`} className='profileButton'>
         <img className='profileImage' 
         src={isUserLoading ? avatar : user.data?.avatarUrl} />
      </Link>
   )
}

export default ProfileHeader