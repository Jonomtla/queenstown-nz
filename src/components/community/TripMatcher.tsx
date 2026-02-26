"use client";

import { useState } from "react";

interface TripMatcherProps {
  activeTraveller: string;
  activeDuration: string;
  activeSeason: string;
  onTravellerChange: (v: string) => void;
  onDurationChange: (v: string) => void;
  onSeasonChange: (v: string) => void;
}

const TRAVELLERS = [
  { value: "family", label: "Family" },
  { value: "couple", label: "Couple" },
  { value: "solo", label: "Solo" },
  { value: "group", label: "Group of Friends" },
];

const DURATIONS = [
  { value: "day", label: "Day Trip" },
  { value: "weekend", label: "Weekend" },
  { value: "midweek", label: "3-5 Days" },
  { value: "week", label: "Week+" },
];

const SEASONS = [
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
  { value: "spring", label: "Spring" },
];

function MatcherPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`text-xs font-semibold tracking-widest-custom uppercase px-4 py-2 rounded-full transition-colors ${
        active
          ? "bg-white text-teal"
          : "bg-white/30 text-white hover:bg-white/40"
      }`}
    >
      {label}
    </button>
  );
}

export default function TripMatcher({
  activeTraveller,
  activeDuration,
  activeSeason,
  onTravellerChange,
  onDurationChange,
  onSeasonChange,
}: TripMatcherProps) {
  const [expanded, setExpanded] = useState(false);
  const hasSelection = activeTraveller !== "all" || activeDuration !== "all" || activeSeason !== "all";
  const activeCount = [activeTraveller !== "all", activeDuration !== "all", activeSeason !== "all"].filter(Boolean).length;

  function handleClear() {
    onTravellerChange("all");
    onDurationChange("all");
    onSeasonChange("all");
  }

  return (
    <div className="bg-teal rounded-2xl p-5 md:p-8 mb-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="md:hidden flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-white text-sm font-bold tracking-widest-custom uppercase">
            Find Trips Like Yours
          </h2>
          {activeCount > 0 && (
            <span className="bg-white text-teal text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-white/70 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="hidden md:flex items-center justify-between mb-5">
        <h2 className="text-white text-sm font-bold tracking-widest-custom uppercase">
          Find Trips Like Yours
        </h2>
        {hasSelection && (
          <button
            onClick={handleClear}
            className="text-white/70 text-xs font-semibold tracking-widest-custom uppercase hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className={`${expanded ? "mt-5" : "hidden"} md:block space-y-4`}>
        <div>
          <p className="text-white/70 text-xs font-semibold tracking-widest-custom uppercase mb-2">
            Who&apos;s coming?
          </p>
          <div className="flex flex-wrap gap-2">
            {TRAVELLERS.map((t) => (
              <MatcherPill
                key={t.value}
                label={t.label}
                active={activeTraveller === t.value}
                onClick={() => onTravellerChange(activeTraveller === t.value ? "all" : t.value)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-white/70 text-xs font-semibold tracking-widest-custom uppercase mb-2">
            How long?
          </p>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <MatcherPill
                key={d.value}
                label={d.label}
                active={activeDuration === d.value}
                onClick={() => onDurationChange(activeDuration === d.value ? "all" : d.value)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-white/70 text-xs font-semibold tracking-widest-custom uppercase mb-2">
            What season?
          </p>
          <div className="flex flex-wrap gap-2">
            {SEASONS.map((s) => (
              <MatcherPill
                key={s.value}
                label={s.label}
                active={activeSeason === s.value}
                onClick={() => onSeasonChange(activeSeason === s.value ? "all" : s.value)}
              />
            ))}
          </div>
        </div>

        {hasSelection && (
          <button
            onClick={handleClear}
            className="md:hidden text-white/70 text-xs font-semibold tracking-widest-custom uppercase hover:text-white transition-colors mt-2"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
