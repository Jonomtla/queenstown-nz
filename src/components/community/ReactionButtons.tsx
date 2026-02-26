"use client";

import { useState } from "react";

interface Reactions {
  stayLonger: number;
  confirmed: number;
  contextMatters: number;
}

interface ReactionButtonsProps {
  reactions: Reactions;
  variant?: "compact" | "full";
}

export default function ReactionButtons({ reactions, variant = "compact" }: ReactionButtonsProps) {
  const [helpful, setHelpful] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Map old data: stayLonger → helpful, confirmed stays
  const helpfulCount = helpful ? reactions.stayLonger + 1 : reactions.stayLonger;
  const confirmedCount = confirmed ? reactions.confirmed + 1 : reactions.confirmed;

  if (variant === "full") {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setHelpful(!helpful); }}
          aria-label={helpful ? "Remove helpful" : "Mark as helpful"}
          aria-pressed={helpful}
          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
            helpful
              ? "border-teal bg-teal/5 text-teal font-semibold"
              : "border-gray-200 text-gray-400 hover:text-teal hover:border-teal"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill={helpful ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>Helpful</span>
          <span className="opacity-60">{helpfulCount}</span>
        </button>

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmed(!confirmed); }}
          aria-label={confirmed ? "Remove confirmation" : "Confirm still accurate"}
          aria-pressed={confirmed}
          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
            confirmed
              ? "border-green-400 bg-green-50 text-green-600 font-semibold"
              : "border-gray-200 text-gray-400 hover:text-green-600 hover:border-green-400"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Been here</span>
          <span className="opacity-60">{confirmedCount}</span>
        </button>
      </div>
    );
  }

  // Compact variant for feed cards
  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setHelpful(!helpful); }}
        aria-label={helpful ? "Remove helpful" : "Mark as helpful"}
        aria-pressed={helpful}
        className={`inline-flex items-center gap-1 text-xs transition-colors ${
          helpful ? "text-teal font-semibold" : "text-gray-400 hover:text-teal"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill={helpful ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
        {helpfulCount}
      </button>

      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmed(!confirmed); }}
        aria-label={confirmed ? "Remove confirmation" : "Confirm still accurate"}
        aria-pressed={confirmed}
        className={`inline-flex items-center gap-1 text-xs transition-colors ${
          confirmed ? "text-green-600 font-semibold" : "text-gray-400 hover:text-green-600"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {confirmedCount}
      </button>
    </div>
  );
}
