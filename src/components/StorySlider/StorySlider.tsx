import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import axios from '../../api/http';

import StoryItem from '../StoryItem/StoryItem';

import './StorySlider.scss';

interface UserStoriesProps {
  _id: string;
  avatarUrl: string;
}

const StorySlider = () => {
  const [data, setData] = useState<Array<UserStoriesProps>>(Array);

  React.useEffect(() => {
    axios.get('user').then((res) => {
      setData(res.data);
    });
  }, []);

  const [iconLeftClass, setIconLeftClass] = useState<string>('icon icon--left icon--hide');
  const [iconRightClass, setIconRightClass] = useState<string>('icon icon--right');

  const slider = document.getElementById('slider') as HTMLButtonElement;
  const slideLeft = () => {
    slider.scrollLeft = slider.scrollLeft - 300;
    if (slider.scrollLeft <= 300) {
      setIconLeftClass('icon icon--left icon--hide');
    }
    if (slider.scrollLeft > 0) {
      setIconRightClass('icon icon--right');
    }
  };

  const slideRight = () => {
    slider.scrollLeft = slider.scrollLeft + 300;
    if (slider.scrollLeft === 0) {
      setIconLeftClass('icon icon--left');
    }
    if (slider.scrollLeft > data.length * 85 - 882) {
      setIconRightClass('icon icon--right icon--hide');
    }
  };

  return (
    <div className="slider">
      <div className={iconLeftClass}>
        <MdChevronLeft onClick={slideLeft} />
      </div>
      <div id="slider" className="storySlider">
        {data?.map((obj, index) => (
          <StoryItem key={index} avatarUrl={obj.avatarUrl} />
        ))}
      </div>

      <div className={iconRightClass}>
        <MdChevronRight onClick={slideRight} />
      </div>
    </div>
  );
};

export default StorySlider;
