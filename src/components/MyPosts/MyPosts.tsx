import React from 'react';

import MyPostItem from '../MyPostItem/MyPostItem';
import EmptyMyPost from '../MyPostItem/EmptyMyPost';

import './MyPosts.scss';

interface MyPostsProps {
  posts: Array<{ _id: string; imageUrl: string }>;
  isLoading: boolean;
}

const MyPosts = ({ posts, isLoading }: MyPostsProps) => {
  return (
    <div className="myPosts">
      {(isLoading ? [...Array(9)] : posts).map((obj, index) =>
        isLoading ? <EmptyMyPost key={index} /> : <MyPostItem key={index} id={obj._id} imageUrl={obj.imageUrl} />
      )}
    </div>
  );
};

export default MyPosts;
