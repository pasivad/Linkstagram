import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/http';

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const { data } = await axios.get('/post');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    });
  },
});

export const postsReducer = postsSlice.reducer;
