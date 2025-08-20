import { Link } from "react-router-dom";

export default function RedditPostItem({ post }) {
  const score = post?.score ?? 0;
  const commentsCount = post?.commentsCount ?? (post?.comments?.length || 0);
  return (
    <article className="post">
      <div className="vote" aria-hidden>
        <div className="arrow up" />
        <div className="score">{score}</div>
        <div className="arrow down" />
      </div>
      <div>
        <h3 className="post-title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h3>
        <div className="post-meta">
          by {post?.userId?.username || "user"} •{" "}
          {new Date(post.createdAt || Date.now()).toLocaleDateString()}
        </div>
        <div className="post-body">{post.body}</div>
        <div className="actions">
          <Link to={`/post/${post._id}`}>{commentsCount} comments</Link>
          <a href="#">share</a>
          <a href="#">save</a>
        </div>
      </div>
    </article>
  );
}
