import React, { useRef, useState } from 'react';
import { BiCopyright } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import EmptySidebar from './EmptySidebar';

import type { RootState } from '../../redux/store';
import { showEditProfileForm, showNewPostForm } from '../../redux/slices/modals';
import { updateUserAvatar } from '../../api/requests';

import './SidebarProfile.scss';
import { socket } from '../../api/http';

interface UserProps {
  data: {
    userName: string;
    avatarUrl: string;
    followers: number;
    following: number;
    job: string;
    description: string;
  } | null;
  status: string;
}

const SidebarProfile = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const inputAvatarRef = React.useRef<HTMLInputElement>(null);

  const user: UserProps = useSelector((state: RootState) => state.user);

  const isPostsLoading = user.status === 'loading';

  const [avatarUrl, setAvatarUrl] = useState<string>('');

  socket.on('receive-avatarUrl', (avatarUrl) => {
    setAvatarUrl(avatarUrl);
  });

  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    updateUserAvatar(event.target.files[0]);
  };

  if (isPostsLoading) return <EmptySidebar />;

  return (
    <div className="sidebarProfile">
      <div className="sidebarHeader">
        <div className="sidebarFollowers">
          <span>{user.data?.followers.toString()}</span>
          {t('sidebar.followers')}
        </div>
        <div className="sidebarAvatar">
          <img src={avatarUrl !== '' ? avatarUrl : user.data?.avatarUrl} className="sidebarImg" alt="avatar" />
          <input ref={inputAvatarRef} type="file" onChange={onSubmit} hidden></input>
          <button onClick={() => inputAvatarRef?.current?.click()} className="sidebarAvatarButton">
            +
          </button>
        </div>
        <div className="sidebarFollowing">
          <span>{user.data?.following.toString()}</span>
          {t('sidebar.following')}
        </div>
      </div>
      <div className="sidebarBody">
        <div className="sidebarProfileInfo">
          <div className="sidebarName">{user.data?.userName}</div>-<div className="sidebarJob">{user.data?.job}</div>
        </div>
        <div className="sidebarAbout">{user.data?.description}</div>
        <div className="sidebarBodyButtons">
          <button onClick={() => dispatch(showEditProfileForm())} className="editProfileButton">
            {t('sidebar.editProfile')}
          </button>
          <button onClick={() => dispatch(showNewPostForm())} className="newPostButton">
            {t('sidebar.newPost')}
          </button>
        </div>
      </div>
      <div className="sidebarFooter">
        <div className="sidebarLinks">
          <a href="#" className="sidebarLinksItem">
            About
          </a>
          <a href="#" className="sidebarLinksItem">
            Help
          </a>
          <a href="#" className="sidebarLinksItem">
            Privacy
          </a>
          <a href="#" className="sidebarLinksItem">
            Terms
          </a>
          <a href="#" className="sidebarLinksItem">
            Location
          </a>
          <a href="#" className="sidebarLinksItem">
            Language
          </a>
        </div>
        <div className="sidebarCopyright">
          <BiCopyright />
          2023 Linkstagram
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
