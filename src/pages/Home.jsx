import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../slices/postSlice";
import PostComposer from "../components/PostComposer";
import SwissPostCard from "../components/SwissPostCard";

export default function Home() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Create a new post</h1>
      <PostComposer />
      <div className="mt-6 grid gap-4">
        {items.map((p) => (
          <SwissPostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
