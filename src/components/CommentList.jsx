import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../slices/commentSlice";

export default function CommentList({ postId }) {
  const dispatch = useDispatch();
  const { byPost, loading } = useSelector((state) => state.comments);
  const comments = byPost[postId] || [];

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (loading && comments.length === 0) return <p>Loading comments...</p>;

  return (
    <div className="space-y-2 mt-2">
      {comments.map((comment) => (
        <div key={comment._id} className="border border-gray-300 p-2 rounded">
          <p className="text-sm text-gray-700">{comment.content}</p>
          <p className="text-xs text-gray-500">
            By {comment.author?.name || "Anonymous"}
          </p>
        </div>
      ))}
    </div>
  );
}
