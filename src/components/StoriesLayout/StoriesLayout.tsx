import React from 'react';
import { IoClose } from 'react-icons/io5';

import StoriesOpenItem from '../StoriesOpenItem/StoriesOpenItem';

import './StoriesLayout.scss';
import { useDispatch } from 'react-redux';
import { showStories } from '../../redux/slices/modals';

const stories = [
  { className: 'storiesOpenItem' },
  { className: 'storiesOpenItem' },
  { className: 'storiesOpenItem storiesOpenItem--active' },
  { className: 'storiesOpenItem' },
  { className: 'storiesOpenItem' },
];

const StoriesLayout = () => {
  const dispatch = useDispatch();

  return (
    <div className="storiesLayout">
      <div className="storiesLayoutHeader">
        <h1 className="storiesLayoutTitle" onClick={() => dispatch(showStories())}>
          Linkstagram
        </h1>
        <button className="storiesCloseBtn" onClick={() => dispatch(showStories())}>
          <IoClose />
        </button>
      </div>
      <div className="storiesLayoutSlider">
        {stories.map((story, id) => (
          <StoriesOpenItem key={id} className={story.className} />
        ))}
      </div>
    </div>
  );
};

export default StoriesLayout;
