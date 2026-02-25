"use client";

import { useState } from "react";

export default function UpvoteButton({ count }: { count: number }) {
  const [upvoted, setUpvoted] = useState(false);
  const displayCount = upvoted ? count + 1 : count;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setUpvoted(!upvoted);
      }}
      aria-label={upvoted ? "Remove upvote" : "Upvote"}
      aria-pressed={upvoted}
      className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
        upvoted ? "text-copper font-semibold" : "text-gray-500 hover:text-copper"
      }`}
    >
      <svg
        className="w-4 h-4"
        fill={upvoted ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
      {displayCount}
    </button>
  );
}
