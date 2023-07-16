import React from 'react';

import './PhotosBlock.scss';

const welcome1 = require('../../assets/images/welcome/welcome1.png');
const welcome2 = require('../../assets/images/welcome/welcome2.png');
const welcome3 = require('../../assets/images/welcome/welcome3.png');
const welcome4 = require('../../assets/images/welcome/welcome4.png');

const PhotosBlock = () => {
  return (
    <div className="photosBlock">
      <img className="welcome1" src={welcome1} alt="" />
      <img className="welcome2" src={welcome2} alt="" />
      <img className="welcome3" src={welcome3} alt="" />
      <img className="welcome4" src={welcome4} alt="" />
    </div>
  );
};

export default PhotosBlock;
