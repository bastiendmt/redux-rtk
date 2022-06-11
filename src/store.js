import { configureStore } from "@reduxjs/toolkit";
import * as postSlice from "./modules/posts.slice";

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
  },
});
