interface CrowdPressure {
  level: "low" | "moderate" | "high" | "extreme";
  peakTimes: string;
  tip: string;
  byHour: number[];
  bestSeason: string;
  worstSeason: string;
}

interface Segment {
  crowdPressure?: CrowdPressure;
  [key: string]: unknown;
}

interface Day {
  segments: Segment[];
  [key: string]: unknown;
}

const LEVEL_ORDER = ["low", "moderate", "high", "extreme"];

function seasonLabel(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CrowdSummary({ days }: { days: Day[] }) {
  const segments = days.flatMap((d) => d.segments);
  const crowded = segments.filter((s) => s.crowdPressure);

  if (crowded.length === 0) return null;

  const highCrowdCount = crowded.filter(
    (s) => s.crowdPressure!.level === "high" || s.crowdPressure!.level === "extreme"
  ).length;

  // Find most common best season
  const seasonCounts: Record<string, number> = {};
  crowded.forEach((s) => {
    const best = s.crowdPressure!.bestSeason;
    seasonCounts[best] = (seasonCounts[best] || 0) + 1;
  });
  const bestSeason = Object.entries(seasonCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  // Find worst season
  const worstCounts: Record<string, number> = {};
  crowded.forEach((s) => {
    const worst = s.crowdPressure!.worstSeason;
    worstCounts[worst] = (worstCounts[worst] || 0) + 1;
  });
  const worstSeason = Object.entries(worstCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  // Find overall peak time pattern
  const avgByHour = new Array(24).fill(0);
  crowded.forEach((s) => {
    s.crowdPressure!.byHour.forEach((v, i) => {
      avgByHour[i] += v;
    });
  });
  const maxHour = avgByHour.indexOf(Math.max(...avgByHour));
  const peakRange = maxHour >= 10 && maxHour <= 14 ? "midday" : maxHour < 10 ? "morning" : "afternoon";

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">
          Crowd Intelligence
        </h3>
      </div>

      <div className="space-y-2">
        {highCrowdCount > 0 && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-orange-600">{highCrowdCount} of {segments.length} activities</span> hit peak crowds at {peakRange} — go early for a better experience.
          </p>
        )}

        {bestSeason && worstSeason && bestSeason !== worstSeason && (
          <p className="text-sm text-gray-700">
            This itinerary is <span className="font-semibold text-green-600">much quieter in {seasonLabel(bestSeason)}</span> vs {seasonLabel(worstSeason)}.
          </p>
        )}

        {crowded.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {crowded.map((s, i) => {
              const level = s.crowdPressure!.level;
              const colors: Record<string, string> = {
                low: "bg-green-100 text-green-700",
                moderate: "bg-amber-100 text-amber-700",
                high: "bg-orange-100 text-orange-700",
                extreme: "bg-red-100 text-red-700",
              };
              return (
                <span
                  key={i}
                  className={`text-[10px] font-semibold tracking-widest-custom uppercase px-2 py-0.5 rounded-full ${colors[level]}`}
                >
                  {level}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
