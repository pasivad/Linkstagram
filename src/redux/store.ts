import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { userReducer } from "./slices/user";


const store = configureStore({
   reducer: {
      posts: postsReducer,
      user: userReducer
   },
   devTools: false
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>