"use client";

interface SeasonCondition {
  label: string;
  temp: string;
  daylight: string;
  notes: string;
  rating: number;
}

interface SeasonalityData {
  monthly: number[];
  conditions: Record<string, SeasonCondition>;
}

const MONTH_LABELS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SEASON_COLORS: Record<string, string> = {
  summer: "bg-amber-500",
  autumn: "bg-orange-500",
  winter: "bg-blue-500",
  spring: "bg-green-500",
};

function getBarColor(value: number): string {
  if (value <= 3) return "bg-blue-300";
  if (value <= 5) return "bg-green-400";
  if (value <= 7) return "bg-amber-400";
  return "bg-orange-400";
}

function getCurrentNZSeason(): string {
  const month = new Date().getMonth() + 1;
  if ([12, 1, 2].includes(month)) return "summer";
  if ([3, 4, 5].includes(month)) return "autumn";
  if ([6, 7, 8].includes(month)) return "winter";
  return "spring";
}

export default function GolfSeasonality({ seasonality }: { seasonality: SeasonalityData }) {
  const currentMonth = new Date().getMonth();
  const currentSeason = getCurrentNZSeason();
  const currentCondition = seasonality.conditions[currentSeason];

  return (
    <div className="bg-cream rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">
          Golf Conditions
        </h3>
      </div>

      {/* Current season highlight */}
      {currentCondition && (
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${SEASON_COLORS[currentSeason]} animate-pulse`} />
              <span className="text-xs font-semibold text-body">Now: {currentCondition.label}</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-3 rounded-sm ${i < currentCondition.rating ? "bg-green-500" : "bg-gray-200"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-4 text-[10px] text-gray-500 mb-2">
            <span>{currentCondition.temp}</span>
            <span>{currentCondition.daylight}</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{currentCondition.notes}</p>
        </div>
      )}

      {/* Monthly playing conditions chart */}
      <p className="text-[10px] font-semibold tracking-widest-custom uppercase text-gray-400 mb-2">
        Playing Conditions by Month
      </p>
      <div className="flex items-end gap-[3px] h-12 mb-1">
        {seasonality.monthly.map((value, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm transition-all ${getBarColor(value)} ${
              i === currentMonth ? "ring-1 ring-gray-800 opacity-100" : "opacity-60"
            }`}
            style={{ height: `${Math.max(value * 4.5, 2)}px` }}
            title={`${MONTH_NAMES[i]} — ${value}/10`}
          />
        ))}
      </div>
      <div className="flex gap-[3px] mb-4">
        {MONTH_LABELS.map((label, i) => (
          <span key={i} className={`flex-1 text-center text-[8px] ${i === currentMonth ? "text-teal font-bold" : "text-gray-400"}`}>
            {label}
          </span>
        ))}
      </div>

      {/* All seasons summary */}
      <div className="space-y-2">
        {Object.entries(seasonality.conditions).map(([season, cond]) => (
          <div key={season} className={`flex items-center justify-between py-1 ${season === currentSeason ? "font-semibold" : ""}`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${SEASON_COLORS[season]}`} />
              <span className="text-xs text-gray-700 capitalize">{season}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">{cond.temp}</span>
              <span className="text-[10px] font-semibold text-teal">{cond.rating}/10</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
