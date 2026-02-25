"use client";

import { useState } from "react";

const SEASONS: Record<string, { label: string; months: number[]; message: string; icon: string }> = {
  summer: {
    label: "Summer",
    months: [12, 1, 2],
    message: "It's summer in Queenstown! Explore lake swims, trail runs, and long golden evenings.",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  },
  autumn: {
    label: "Autumn",
    months: [3, 4, 5],
    message: "Autumn colours are here! Don't miss the golden trees in Arrowtown and crisp morning hikes.",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  winter: {
    label: "Winter",
    months: [6, 7, 8],
    message: "Winter is on! Fresh powder, fireside dining, and the Queenstown Winter Festival.",
    icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
  },
  spring: {
    label: "Spring",
    months: [9, 10, 11],
    message: "Spring is blooming! Wildflowers, newborn lambs, and the trails are coming alive.",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
};

function getCurrentNZSeason(): string {
  const month = new Date().getMonth() + 1;
  for (const [key, s] of Object.entries(SEASONS)) {
    if (s.months.includes(month)) return key;
  }
  return "summer";
}

interface SeasonalBannerProps {
  activeSeason: string;
  onSeasonChange: (season: string) => void;
}

export default function SeasonalBanner({ activeSeason, onSeasonChange }: SeasonalBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const currentSeason = getCurrentNZSeason();
  const season = SEASONS[currentSeason];

  if (dismissed || activeSeason === currentSeason) return null;

  return (
    <div className="bg-teal/10 border border-teal/20 rounded-xl p-4 mb-6 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={season.icon} />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700">{season.message}</p>
      </div>
      <button
        onClick={() => onSeasonChange(currentSeason)}
        className="shrink-0 text-xs font-semibold tracking-widest-custom uppercase text-teal hover:text-teal-light transition-colors px-3 py-1.5 rounded-full bg-teal/10 hover:bg-teal/20"
      >
        Show {season.label}
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
