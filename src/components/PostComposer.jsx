import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../slices/postSlice";

export default function PostComposer() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.posts);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    try {
      await dispatch(
        createPost({ title: title.trim(), body: body.trim() })
      ).unwrap();
      setTitle("");
      setBody("");
    } catch (err) {
      alert(err?.message || "Failed to post");
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
      />
      <button disabled={loading}>{loading ? "Posting..." : "Post"}</button>
    </form>
  );
}
