"use client";

import { useState } from "react";

// Simulated monthly visitor pressure data for Queenstown (0-10 scale)
// Based on real seasonal patterns: peak summer (Dec-Feb), ski season (Jun-Aug), shoulder quiet (May, Oct-Nov)
const MONTHLY_DATA = [
  { month: "Jan", short: "J", value: 9, season: "summer", label: "Peak summer — very busy" },
  { month: "Feb", short: "F", value: 8, season: "summer", label: "Late summer — busy but easing" },
  { month: "Mar", short: "M", value: 6, season: "autumn", label: "Autumn colours draw crowds to Arrowtown" },
  { month: "Apr", short: "A", value: 4, season: "autumn", label: "Shoulder season — great time to visit" },
  { month: "May", short: "M", value: 2, season: "autumn", label: "Quietest month — locals' favourite" },
  { month: "Jun", short: "J", value: 5, season: "winter", label: "Ski season starts — building" },
  { month: "Jul", short: "J", value: 8, season: "winter", label: "Peak ski season — busy on mountain" },
  { month: "Aug", short: "A", value: 7, season: "winter", label: "Late ski season — still busy weekends" },
  { month: "Sep", short: "S", value: 3, season: "spring", label: "Spring shoulder — quiet and beautiful" },
  { month: "Oct", short: "O", value: 3, season: "spring", label: "Spring — great deals, fewer people" },
  { month: "Nov", short: "N", value: 5, season: "spring", label: "Warming up — activity season begins" },
  { month: "Dec", short: "D", value: 9, season: "summer", label: "Holiday peak — book everything early" },
];

const LIVE_STATUS: Record<string, { text: string; color: string }> = {
  summer: { text: "Busy season — book activities ahead", color: "text-orange-600" },
  autumn: { text: "Shoulder season — great availability", color: "text-green-600" },
  winter: { text: "Ski season — mountain busy, town quieter", color: "text-teal" },
  spring: { text: "Quiet season — best deals right now", color: "text-green-600" },
};

function getBarColor(value: number): string {
  if (value <= 3) return "bg-green-400";
  if (value <= 5) return "bg-teal";
  if (value <= 7) return "bg-amber-400";
  return "bg-orange-400";
}

function getCurrentNZMonth(): number {
  return new Date().getMonth(); // 0-indexed
}

function getCurrentNZSeason(): string {
  const month = new Date().getMonth() + 1;
  if ([12, 1, 2].includes(month)) return "summer";
  if ([3, 4, 5].includes(month)) return "autumn";
  if ([6, 7, 8].includes(month)) return "winter";
  return "spring";
}

export default function DestinationBusyness() {
  const currentMonth = getCurrentNZMonth();
  const currentSeason = getCurrentNZSeason();
  const liveStatus = LIVE_STATUS[currentSeason];
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const displayMonth = hoveredMonth !== null ? hoveredMonth : currentMonth;
  const displayData = MONTHLY_DATA[displayMonth];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">
          When to Visit
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-green-600">Live</span>
        </div>
      </div>

      <p className={`text-xs font-semibold ${liveStatus.color} mb-4`}>
        {liveStatus.text}
      </p>

      {/* 12-month bar chart */}
      <div className="flex items-end gap-[3px] h-20 mb-1">
        {MONTHLY_DATA.map((data, i) => {
          const isCurrentMonth = i === currentMonth;
          const isHovered = i === hoveredMonth;
          return (
            <div
              key={data.month}
              className="flex-1 flex flex-col items-center cursor-pointer group"
              onMouseEnter={() => setHoveredMonth(i)}
              onMouseLeave={() => setHoveredMonth(null)}
            >
              <div
                className={`w-full rounded-t-sm transition-all ${
                  isCurrentMonth
                    ? "bg-teal ring-1 ring-teal"
                    : isHovered
                      ? getBarColor(data.value) + " opacity-100"
                      : getBarColor(data.value) + " opacity-50"
                }`}
                style={{ height: `${Math.max(data.value * 7, 4)}px` }}
              />
            </div>
          );
        })}
      </div>

      {/* Month labels */}
      <div className="flex gap-[3px] mb-3">
        {MONTHLY_DATA.map((data, i) => (
          <div
            key={data.month}
            className={`flex-1 text-center text-[8px] tracking-wider ${
              i === currentMonth
                ? "text-teal font-bold"
                : i === hoveredMonth
                  ? "text-gray-700 font-semibold"
                  : "text-gray-400"
            }`}
          >
            {data.short}
          </div>
        ))}
      </div>

      {/* Tooltip / description for hovered or current month */}
      <div className="bg-gray-50 rounded-lg px-3 py-2 min-h-[44px]">
        <p className="text-xs font-semibold text-gray-700">
          {displayData.month}
          {displayMonth === currentMonth && (
            <span className="text-teal ml-1">(now)</span>
          )}
        </p>
        <p className="text-[11px] text-gray-500 leading-relaxed">{displayData.label}</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 text-[9px] text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-green-400" /> Quiet
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-teal" /> Moderate
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-amber-400" /> Busy
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm bg-orange-400" /> Peak
        </span>
      </div>

      {/* Quick tip */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-[11px] text-gray-500 leading-relaxed">
          <span className="font-semibold text-green-600">Best value:</span> May & Sep-Oct.
          Fewer crowds, lower prices, and locals say autumn is the most beautiful season.
        </p>
      </div>
    </div>
  );
}
