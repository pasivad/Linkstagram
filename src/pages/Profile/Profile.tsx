import React, { useState } from 'react'

import './Profile.scss'

import Header from '../../components/Header/Header'
import SignOutHeader from '../../components/SignOutHeader/SignOutHeader'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import LanguageHeader from '../../components/LanguageHeader/LanguageHeader'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import MyProfile from '../../components/MyProfile/MyProfile'
import MyPosts from '../../components/MyPosts/MyPosts'
import { useSelector } from 'react-redux'
import { selectIsLogin } from '../../redux/slices/user'
import { Navigate } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import PostForm from '../../components/PostForm/PostForm'
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm'
import NewPostForm from '../../components/NewPostForm/NewPostForm'


const Home = () => {
   const [openPost, setOpenPost] = useState(false);
   const [editProfileModal, setEditProfileModal] = useState(false);
   const [newPostModal, setNewPostModal] = useState(false);

   const isAuth = useSelector(selectIsLogin);
   return (
      <>
         <Header>
            <HomeHeader />
            <SignOutHeader />
            <LanguageHeader />
            <ProfileHeader />
         </Header>
         <div className='profileContainer'>
            <MyProfile setEditProfileModal={setEditProfileModal} setNewPostModal={setNewPostModal}/>
            <MyPosts setOpenPost={setOpenPost}/>
         </div>
         {openPost && (
            <Modal>
               <PostForm setModal={setOpenPost} />
            </Modal>
         )}
         {editProfileModal && (
            <Modal>
               <EditProfileForm setModal={setEditProfileModal} />
            </Modal>
         )}
         {newPostModal && (
         <Modal>
            <NewPostForm setModal={setNewPostModal} />
         </Modal>
      )}
      </>
   )
}

export default Home