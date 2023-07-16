import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '../../redux/store';

import Header from '../../components/Header/Header';
import SignOutHeader from '../../components/SignOutHeader/SignOutHeader';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import LanguageHeader from '../../components/LanguageHeader/LanguageHeader';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import MyProfile from '../../components/MyProfile/MyProfile';
import MyPosts from '../../components/MyPosts/MyPosts';
import Modal from '../../components/Modal/Modal';
import PostForm from '../../components/PostForm/PostForm';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import NewPostForm from '../../components/NewPostForm/NewPostForm';

import axios from '../../api/http';

import './Profile.scss';

interface UserProps {
  _id: string;
  userName: string;
  avatarUrl: string;
  followers: number;
  following: number;
  job: string;
  description: string;
  isLoading: boolean;
}

interface PostProps {
  _id: string;
  imageUrl: string;
}

const Home = () => {
  const modals = useSelector((state: RootState) => state.modals);

  if (modals.postForm || modals.newPostForm || modals.editProfileForm) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  const { id } = useParams<string>();
  const [userData, setUserData] = useState<UserProps>(Object);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState<Array<PostProps>>(Object);
  const [isPostLoading, setIsPostLoading] = useState<boolean>(true);

  React.useEffect(() => {
    axios.get(`/user?userId=${id}`).then((res) => {
      setUserData(res.data);
      setIsUserLoading(false);
    });
    axios.get(`/post/profile/${id}`).then((res) => {
      setPostData(res.data);
      setIsPostLoading(false);
    });
  }, [id]);

  return (
    <>
      <Header>
        <HomeHeader />
        <SignOutHeader />
        <LanguageHeader />
        <ProfileHeader />
      </Header>
      <div className="profileContainer">
        <MyProfile
          _id={userData._id}
          userName={userData.userName}
          job={userData.job}
          description={userData.description}
          avatarUrl={userData.avatarUrl}
          followers={userData.followers}
          following={userData.following}
          isLoading={isUserLoading}
        />
        <MyPosts posts={postData} isLoading={isPostLoading} />
      </div>
      {modals.postForm && (
        <Modal>
          <PostForm />
        </Modal>
      )}
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
    </>
  );
};

export default Home;
