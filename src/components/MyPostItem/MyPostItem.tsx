import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { showPostForm } from '../../redux/slices/modals';

import './MyPostItem.scss';

interface MyPostItemProps {
  id?: string;
  imageUrl?: string;
}

const MyPostItem = ({ id, imageUrl }: MyPostItemProps) => {
  const dispatch = useDispatch();

  return (
    <Link onClick={() => dispatch(showPostForm())} to={`post/${id}`} className="myPostItem">
      <img src={imageUrl} alt="myPostItem" className="myPostImg" />
    </Link>
  );
};

export default MyPostItem;
