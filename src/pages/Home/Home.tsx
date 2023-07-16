import React from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../redux/store';

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

import './Home.scss';

const Home = () => {
  const modals = useSelector((state: RootState) => state.modals);

  if (modals.postForm || modals.newPostForm || modals.editProfileForm || modals.stories) {
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
        <Posts />
        <SidebarProfile />
      </div>
      {modals.editProfileForm && (
        <Modal>
          <EditProfileForm />
        </Modal>
      )}
      {modals.newPostForm && (
        <Modal>
          <NewPostForm />
        </Modal>
      )}
      {modals.stories && <StoriesLayout />}
      {modals.postForm && (
        <Modal>
          <PostForm />
        </Modal>
      )}
    </>
  );
};

export default Home;
