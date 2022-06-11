import styles from "./Post.module.css";

export const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};
