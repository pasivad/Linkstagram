import React, { useState } from 'react';
import axios from '../api/http';

export const likePostRequest = ({ id, callback }: { id: string; callback: () => void }) => {
  try {
    axios.patch(`/user/like/${id}`);
    callback();
  } catch (err) {
    console.warn(err);
    alert('Failed to like post');
  }
};

export const unlikePostRequest = ({ id, callback }: { id: string; callback: () => void }) => {
  try {
    axios.patch(`/user/unlike/${id}`);
    callback();
  } catch (err) {
    console.warn(err);
    alert('Failed to unlike post');
  }
};

export const createComment = ({
  id,
  commentValue,
  callback,
}: {
  id: string;
  commentValue: string;
  callback: () => void;
}) => {
  axios
    .post(`/comment/${id}`, { text: commentValue })
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.warn(err);
      alert('Failed to comment');
    });
};

export const createReply = ({
  postId,
  commentId,
  commentValue,
  callback,
}: {
  postId: string;
  commentId: string;
  commentValue: string;
  callback: () => void;
}) => {
  axios
    .patch(`/comment/reply/${postId}/${commentId}`, { text: commentValue })
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.warn(err);
      alert('Failed to comment');
    });
};

export const likeCommentRequest = ({ id, callback }: { id: string; callback: () => void }) => {
  try {
    axios.patch(`/user/likecom/${id}`);
    callback();
  } catch (err) {
    console.warn(err);
    alert('Failed to like comment');
  }
};

export const unlikeCommentRequest = ({ id, callback }: { id: string; callback: () => void }) => {
  try {
    axios.patch(`/user/unlikecom/${id}`);
    callback();
  } catch (err) {
    console.warn(err);
    alert('Failed to unlike comment');
  }
};

export const editUserInfo = ({
  userName,
  job,
  description,
}: {
  userName: string;
  job: string;
  description: string;
}) => {
  axios
    .patch('/user', {
      userName: userName,
      job: job,
      description: description,
    })
    .then(() => window.location.reload())
    .catch((err) => {
      console.warn(err);
      alert('Failed to edit account');
    });
};

export const addPost = ({ text, image }: { text: string; image: File }) => {
  let formData = new FormData();
  formData.append('imageUrl', image);
  formData.append('text', text);
  axios
    .post('/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => window.location.reload())
    .catch((err) => {
      console.warn(err);
      alert('Failed to create post');
    });
};

export const updateUserAvatar = (avatarUrl: File) => {
  let formData = new FormData();
  formData.append('avatarUrl', avatarUrl);
  axios
    .patch('/user/avatar', formData)
    .then(() => {})
    .catch((err) => {
      console.warn(err);
      alert('Failed to load an avatar');
    });
};
