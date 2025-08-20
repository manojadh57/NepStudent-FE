import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../slices/postSlice";
import ShellReddit from "../components/ShellReddit";
import PostForm from "../components/PostForm";
import SwissPostCard from "../components/SwissPostCard.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { list: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <ShellReddit>
      <PostForm /> {/* Add this line */}
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <SwissPostCard key={post._id} post={post} />
      ))}
    </ShellReddit>
  );
}
