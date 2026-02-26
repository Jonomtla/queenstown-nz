"use client";

import { useState } from "react";

interface Reactions {
  stayLonger: number;
  confirmed: number;
  contextMatters: number;
}

export default function ReactionButtons({ reactions }: { reactions: Reactions }) {
  const [active, setActive] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items = [
    {
      key: "stayLonger",
      label: "Worth staying longer for",
      count: reactions.stayLonger,
      color: "text-teal",
      activeColor: "text-teal font-semibold",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: "confirmed",
      label: "Still relevant",
      count: reactions.confirmed,
      color: "text-green-600",
      activeColor: "text-green-600 font-semibold",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      key: "contextMatters",
      label: "Context matters",
      count: reactions.contextMatters,
      color: "text-amber-500",
      activeColor: "text-amber-600 font-semibold",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="inline-flex items-center gap-3">
      {items.map((item) => {
        const isActive = active[item.key] || false;
        const displayCount = isActive ? item.count + 1 : item.count;
        return (
          <button
            key={item.key}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(item.key);
            }}
            aria-label={isActive ? `Remove: ${item.label}` : item.label}
            aria-pressed={isActive}
            title={item.label}
            className={`inline-flex items-center gap-1 text-sm transition-colors ${
              isActive ? item.activeColor : `text-gray-400 hover:${item.color}`
            }`}
          >
            {item.icon}
            {displayCount}
          </button>
        );
      })}
    </div>
  );
}
