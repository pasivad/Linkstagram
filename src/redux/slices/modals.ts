import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postForm: false,
  editProfileForm: false,
  newPostForm: false,
  stories: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showPostForm(state) {
      state.postForm = !state.postForm;
    },
    showEditProfileForm(state) {
      state.editProfileForm = !state.editProfileForm;
    },
    showNewPostForm(state) {
      state.newPostForm = !state.newPostForm;
    },
    showStories(state) {
      state.stories = !state.stories;
    },
  },
});

export const modalsReducer = modalsSlice.reducer;

export const { showPostForm, showEditProfileForm, showNewPostForm, showStories } = modalsSlice.actions;
