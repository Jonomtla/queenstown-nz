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
  const [active, setActive] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items = [
    {
      key: "stayLonger",
      label: "Stay longer",
      fullLabel: "Worth staying longer for",
      count: reactions.stayLonger,
      inactiveColor: "text-gray-400 hover:text-teal hover:border-teal",
      activeColor: "text-teal border-teal bg-teal/5 font-semibold",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: "confirmed",
      label: "Confirmed",
      fullLabel: "Still relevant / confirmed",
      count: reactions.confirmed,
      inactiveColor: "text-gray-400 hover:text-green-600 hover:border-green-400",
      activeColor: "text-green-600 border-green-400 bg-green-50 font-semibold",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      key: "contextMatters",
      label: "Context",
      fullLabel: "Context matters — season, weather, or crowds change this",
      count: reactions.contextMatters,
      inactiveColor: "text-gray-400 hover:text-amber-600 hover:border-amber-400",
      activeColor: "text-amber-600 border-amber-400 bg-amber-50 font-semibold",
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  if (variant === "full") {
    return (
      <div className="flex flex-wrap gap-2">
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
              aria-label={isActive ? `Remove: ${item.fullLabel}` : item.fullLabel}
              aria-pressed={isActive}
              title={item.fullLabel}
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                isActive ? item.activeColor : `border-gray-200 ${item.inactiveColor}`
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              <span className="opacity-60">{displayCount}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact: for cards — still show short label
  return (
    <div className="inline-flex items-center gap-2">
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
            aria-label={isActive ? `Remove: ${item.fullLabel}` : item.fullLabel}
            aria-pressed={isActive}
            title={item.fullLabel}
            className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border transition-colors ${
              isActive ? item.activeColor : `border-transparent ${item.inactiveColor}`
            }`}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
            <span className="opacity-60">{displayCount}</span>
          </button>
        );
      })}
    </div>
  );
}
