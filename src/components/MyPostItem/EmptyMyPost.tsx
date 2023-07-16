import React from 'react';

import './MyPostItem.scss';

const EmptyMyPost = () => {
  return (
    <div className="skeleton skeleton-myPostItem">
      <div className="skeleton skeleton-myPostImg"></div>
    </div>
  );
};

export default EmptyMyPost;
