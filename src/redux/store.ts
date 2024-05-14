import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { userReducer } from './slices/user';
import { modalsReducer } from './slices/modals';
import { loginSessionsReducer } from './slices/loginSessions';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    modals: modalsReducer,
    loginSessions: loginSessionsReducer,
  },
  devTools: false,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
