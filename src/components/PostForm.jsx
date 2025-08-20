import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../slices/postSlice";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await dispatch(createPost({ title, content })).unwrap();
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Create a new post</h2>
      <input
        className="w-full border p-2 mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
