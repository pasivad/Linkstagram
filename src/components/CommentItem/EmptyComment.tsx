import React from 'react';

import './CommentItem.scss';

const EmptyComment = () => {
  return (
    <div className={'commentItem'}>
      <div className={'skeleton skeleton-commentBody'}>
        <div className="commentFooter">
          <div className="commentTime"></div>
          <div className="commentLikeStats"></div>
          <button className="commentReply"></button>
        </div>
      </div>
    </div>
  );
};

export default EmptyComment;
