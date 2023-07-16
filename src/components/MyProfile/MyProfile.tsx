import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../redux/store';
import { showEditProfileForm, showNewPostForm } from '../../redux/slices/modals';

import EmptyMyProfile from './EmptyMyProfile';

import './MyProfile.scss';

interface MyProfileProps {
  _id: string;
  userName: string;
  avatarUrl: string;
  followers: number;
  following: number;
  job: string;
  description: string;
  isLoading: boolean;
}

interface MyProps {
  data: {
    _id: string;
  } | null;
  status: string;
}

const MyProfile = ({ _id, userName, job, description, avatarUrl, followers, following, isLoading }: MyProfileProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user: MyProps = useSelector((state: RootState) => state.user);

  if (isLoading) return <EmptyMyProfile />;

  return (
    <div className="myProfile">
      <div className="myProfileAvatar">
        <img src={avatarUrl} alt="myProfileImg" className="myProfileImg" />
      </div>

      <div className="myProfileBody">
        <div className="myProfileDetails">
          <div className="myProfileName">{userName}</div>-<div className="myProfileJob">{job}</div>
        </div>
        <div className="myProfileAbout">{description}</div>
      </div>

      <div className="myProfileInfo">
        <div className="myProfileFollows">
          <div className="myProfileFollowers">
            <span>{followers}</span>
            {t('sidebar.followers')}
          </div>
          <div className="myProfileFollowing">
            <span>{following}</span>
            {t('sidebar.following')}
          </div>
        </div>
        {user.data?._id === _id && (
          <div className="myProfileButtons">
            <button onClick={() => dispatch(showEditProfileForm())} className="myProfileEditButton">
              {t('sidebar.editProfile')}
            </button>
            <button onClick={() => dispatch(showNewPostForm())} className="myProfileNewPostButton">
              {t('sidebar.newPost')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
