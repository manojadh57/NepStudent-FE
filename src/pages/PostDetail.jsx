import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import ShellReddit from "../components/ShellReddit";

export default function PostDetail() {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.posts.list.find((p) => p._id === id)
  );

  if (!post) return <p className="p-4">Post not found.</p>;

  return (
    <ShellReddit>
      <div className="max-w-2xl mx-auto p-4">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700 mt-2">{post.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            Posted by {post.author?.name}
          </p>
        </div>

        <CommentForm postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </ShellReddit>
  );
}
