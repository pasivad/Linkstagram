import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '../../redux/store';

import './ProfileHeader.scss';
import { socket } from '../../api/http';

const avatarDefault = require('../../assets/images/profiles/profile.webp');

interface UserProps {
  data: {
    _id: string;
    avatarUrl: string;
  } | null;
  status: string;
}

const ProfileHeader = () => {
  const user: UserProps = useSelector((state: RootState) => state.user);

  const isUserLoading = user.status === 'loading';

  const [avatarUrl, setAvatarUrl] = useState<string>('');

  socket.on('receive-avatarUrl', (avatarUrl) => {
    setAvatarUrl(avatarUrl);
  });

  return (
    <Link to={`/profile/${user.data?._id}`} className="profileButton">
      <img
        className="profileImage"
        src={isUserLoading ? avatarDefault : avatarUrl !== '' ? avatarUrl : user.data?.avatarUrl}
        alt="avatarUrl"
      />
    </Link>
  );
};

export default ProfileHeader;
