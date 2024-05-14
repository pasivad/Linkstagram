import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/http';

export const fetchLoginSessions = createAsyncThunk('loginSessions/fetchLoginSessions', async () => {
  const { data } = await axios.get('/loginSessions');
  return data;
});

const initialState = {
  loginSessions: {
    items: [],
    status: 'loading',
  },
};

const loginSessionsSlice = createSlice({
  name: 'loginSessions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoginSessions.pending, (state) => {
      state.loginSessions.items = [];
      state.loginSessions.status = 'loading';
    });
    builder.addCase(fetchLoginSessions.fulfilled, (state, action) => {
      state.loginSessions.items = action.payload;
      state.loginSessions.status = 'loaded';
    });
    builder.addCase(fetchLoginSessions.rejected, (state) => {
      state.loginSessions.items = [];
      state.loginSessions.status = 'error';
    });
  },
});

export const loginSessionsReducer = loginSessionsSlice.reducer;
