// TEACHER NOTE:
// Prefer `post.__author` produced by normalizeAuthor().
// Fall back safely if needed.

import { Link } from "react-router-dom";

export default function SwissPostCard({ post }) {
  if (!post) return null;

  const author =
    post.__author ||
    post?.user?.username ||
    post?.username ||
    post?.author ||
    "anonymous";

  const created = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "";

  return (
    <article className="border p-3">
      <div className="text-sm">↑0 ↓</div>
      <Link to={`/post/${post._id}`} className="underline font-medium">
        {post.title}
      </Link>
      <div className="text-sm mt-1 opacity-70">
        by {author}
        {created && ` • ${created}`}
      </div>
      <p className="mt-2 whitespace-pre-wrap">{post.body}</p>
      <div className="mt-2 text-sm opacity-70">0 comments • share • save</div>
    </article>
  );
}
