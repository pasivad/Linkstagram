import React from 'react';
import { useState } from 'react';

import axios from '../../axios';

import './Home.scss';

import Header from '../../components/Header/Header';
import SignOutHeader from '../../components/SignOutHeader/SignOutHeader';
import LanguageHeader from '../../components/LanguageHeader/LanguageHeader';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Posts from '../../components/Posts/Posts';
import SidebarProfile from '../../components/SidebarProfile/SidebarProfile';
import Modal from '../../components/Modal/Modal';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import NewPostForm from '../../components/NewPostForm/NewPostForm';
import StoriesLayout from '../../components/StoriesLayout/StoriesLayout';
import PostForm from '../../components/PostForm/PostForm';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../redux/slices/user';
import { Navigate } from 'react-router-dom';
import ModalNotFound from '../../components/ModalNotFound/ModalNotFound';

const Home = () => {
   const [editProfileModal, setEditProfileModal] = useState(false);
   const [openPost, setOpenPost] = useState(false);
   const [newPostModal, setNewPostModal] = useState(false);
   const [openStory, setOpenStory] = useState(false);

   const isAuth = useSelector(selectIsLogin);

   if (editProfileModal || newPostModal || openStory || openPost) {
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'visible';
   }

   return (
      <>
      <Header>
         <SignOutHeader />
         <LanguageHeader />
         <ProfileHeader />
      </Header>
      <div className="homeContainer">
         <Posts setOpenStory={setOpenStory} setOpenPost={setOpenPost} />
         <SidebarProfile setEditProfileModal={setEditProfileModal} setNewPostModal={setNewPostModal} />
      </div>
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
      {openStory && <StoriesLayout setOpenStory={setOpenStory} />}
      {openPost && (
         <Modal>
            <PostForm setModal={setOpenPost} />
         </Modal>
      )}
   </>
   );
};

export default Home;
