import { wait } from "../utils";

/**
 * INITIAL STATE
 */
const initialState = {
  status: "idle", // "idle" | "pending" | "succeed" | "error"
  ids: [],
  entities: {},
};

/**
 * ACTION TYPE
 */
const FETCH_POSTS_PENDING = "posts/FETCH_POSTS_PENDING";
const FETCH_POSTS_SUCCEED = "posts/FETCH_POSTS_SUCCEED";

/**
 * ACTION CREATOR
 */
const fetchPostsPending = () => ({
  type: FETCH_POSTS_PENDING,
});

const fetchPostsSucceed = (posts) => ({
  type: FETCH_POSTS_SUCCEED,
  payload: posts,
});

/**
 * THUNKS
 */
export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsPending());

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  await wait(1000);

  dispatch(fetchPostsSucceed(posts));
};

/**
 * REDUCER
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return { ...state, status: "pending" };

    case FETCH_POSTS_SUCCEED: {
      const postsIds = action.payload.map((post) => post.id);
      const postsEntities = action.payload.reduce(
        (acc, post) => ({
          ...acc,
          [post.id]: post,
        }),
        {}
      );

      return {
        ...state,
        status: "succeed",
        ids: postsIds,
        entities: postsEntities,
      };
    }

    default:
      return state;
  }
};
