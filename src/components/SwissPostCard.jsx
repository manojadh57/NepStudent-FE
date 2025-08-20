import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function SwissPostCard({ post }) {
  const {
    _id,
    title,
    body,
    author,
    createdAt,
    comments = [],
    upvotes = 0,
    downvotes = 0,
  } = post;

  const date = new Date(createdAt).toLocaleDateString("en-GB");

  return (
    <div className="border rounded-lg p-4 mb-4 flex flex-col gap-1 bg-white">
      {/* Voting */}
      <div className="flex items-center gap-2 text-gray-500">
        <FaArrowUp className="cursor-pointer hover:text-black" />
        <span className="font-bold">{upvotes - downvotes}</span>
        <FaArrowDown className="cursor-pointer hover:text-black" />
      </div>

      {/* Title + Link */}
      <Link
        to={`/post/${_id}`}
        className="text-xl font-bold hover:underline text-black"
      >
        {title}
      </Link>

      {/* Author + Date */}
      <div className="text-sm text-gray-400 mb-1">
        by {author?.username || "anonymous"} • {date}
      </div>

      {/* Body (short preview) */}
      <p className="text-sm text-gray-700 line-clamp-2">{body}</p>

      {/* Actions */}
      <div className="flex gap-4 mt-2 text-sm text-gray-500">
        <span>{comments.length} comments</span>
        <span className="cursor-pointer hover:underline">share</span>
        <span className="cursor-pointer hover:underline">save</span>
      </div>
    </div>
  );
}
