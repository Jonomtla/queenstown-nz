"use client";

import { useState } from "react";
import Link from "next/link";
import { useSavedItems } from "./SaveButton";

export default function SavedTripBar() {
  const savedItems = useSavedItems();
  const [expanded, setExpanded] = useState(false);

  if (savedItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-teal text-white shadow-lg">
        {expanded && (
          <div className="px-4 pt-4 pb-2 border-b border-teal-light/30 max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {savedItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.type === "itinerary" ? `/community/${item.id}/` : "#"}
                  className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="truncate">{item.title}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/community/saved/"
              className="inline-block mt-3 text-xs font-semibold tracking-widest-custom uppercase text-white/80 hover:text-white border border-white/30 rounded-full px-4 py-1.5 transition-colors"
            >
              View My Trip
            </Link>
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <span className="text-sm font-semibold">
            My Trip: {savedItems.length} saved
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
