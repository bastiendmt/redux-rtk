import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Post } from "./modules/Post";
import { fetchPosts } from "./modules/posts.slice";

const App = () => {
  const { status, entities: postsEntities } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  return (
    <div className="App">
      <button onClick={() => dispatch(fetchPosts())}>fetch posts</button>
      {status === "pending" && <p>loading...</p>}
      {status === "succeed" &&
        Object.keys(postsEntities).map((postId) => (
          <Post key={postId} post={postsEntities[postId]} />
        ))}
    </div>
  );
};

export default App;
