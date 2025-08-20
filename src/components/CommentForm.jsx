import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../slices/commentSlice";

export default function CommentForm({ postId }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.comments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await dispatch(createComment({ postId, content })).unwrap();
      setContent("");
    } catch (err) {
      console.error("Comment error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
