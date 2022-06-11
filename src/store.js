import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import * as postSlice from "./modules/posts.slice";

const rootReducer = combineReducers({
  posts: postSlice.reducer,
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
