import {
  createAsyncThunk,
  createEntityAdapter,
  createReducer,
} from "@reduxjs/toolkit";
import { wait } from "../utils";

const postsAdapter = createEntityAdapter();

postsAdapter.getInitialState();

/**
 * INITIAL STATE
 */
const initialState = {
  status: "idle", // "idle" | "pending" | "succeed" | "error"
  ...postsAdapter.getInitialState(),
};

/**
 * THUNKS
 */
export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  await wait(1000);
  return posts;
});

/**
 * REDUCER
 */
export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchPosts.pending.type, (state) => {
    // return { ...state, status: "pending" }; same thing  thanks to immerJS
    state.status = "pending";
  });
  builder.addCase(fetchPosts.fulfilled.type, (state, action) => {
    state.status = "succeed";
    postsAdapter.addMany(state, action.payload);
  });
});
