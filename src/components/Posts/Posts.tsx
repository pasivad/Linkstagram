import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../redux/store';
import { fetchPosts } from '../../redux/slices/posts';

import StorySlider from '../StorySlider/StorySlider';
import Card from '../Card/Card';
import EmptyCard from '../Card/EmptyCard';

import './Posts.scss';

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts } = useSelector((state: RootState) => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);


  return (
    <div className="posts">
      <StorySlider />
      {(isPostsLoading ? [...Array(3)] : posts.items).map((obj, index) =>
        isPostsLoading ? (
          <EmptyCard key={index} />
        ) : (
          <Card
            key={index}
            id={obj._id}
            userId={obj.user._id}
            avatar={obj.user.avatarUrl}
            name={obj.user.userName}
            postImg={obj.imageUrl}
            text={obj.text}
            likes={obj.likes}
            commentsNumber={obj.commentsNumber}
            date={obj.createdAt}
          />
        )
      )}
    </div>
  );
};

export default Posts;
