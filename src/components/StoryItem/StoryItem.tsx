import React from 'react';
import { useDispatch } from 'react-redux';

import { showStories } from '../../redux/slices/modals';

import './StoryItem.scss';

const StoryItem = ({ avatarUrl }: { avatarUrl: string }) => {
  const dispatch = useDispatch();

  return (
    <div className="storyItem" onClick={() => dispatch(showStories())}>
      <img src={avatarUrl} alt="avatar" />
    </div>
  );
};

export default StoryItem;
