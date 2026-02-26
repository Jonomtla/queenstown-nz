interface CrowdPressure {
  level: "low" | "moderate" | "high" | "extreme";
  peakTimes: string;
  tip: string;
  byMonth?: number[];
  bestSeason: string;
  worstSeason: string;
  dispersalNudge?: { alternative: string; reason: string; slug?: string | null };
}

interface Segment {
  title?: string;
  crowdPressure?: CrowdPressure;
  [key: string]: unknown;
}

interface Day {
  segments: Segment[];
  [key: string]: unknown;
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CrowdSummary({ days }: { days: Day[] }) {
  const segments = days.flatMap((d) => d.segments);
  const crowded = segments.filter((s) => s.crowdPressure);

  if (crowded.length === 0) return null;

  const highCrowd = crowded.filter(
    (s) => s.crowdPressure!.level === "high" || s.crowdPressure!.level === "extreme"
  );

  // Find most common best/worst season
  const seasonCounts: Record<string, number> = {};
  const worstCounts: Record<string, number> = {};
  crowded.forEach((s) => {
    const best = s.crowdPressure!.bestSeason;
    const worst = s.crowdPressure!.worstSeason;
    seasonCounts[best] = (seasonCounts[best] || 0) + 1;
    worstCounts[worst] = (worstCounts[worst] || 0) + 1;
  });
  const bestSeason = Object.entries(seasonCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const worstSeason = Object.entries(worstCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  // Get names of high-crowd activities
  const highNames = highCrowd
    .map((s) => s.title)
    .filter(Boolean)
    .slice(0, 3);

  // Count dispersal nudges available
  const nudgeCount = crowded.filter((s) => s.crowdPressure!.dispersalNudge).length;

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

      <div className="space-y-3">
        {highCrowd.length > 0 && (
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-orange-600">{highCrowd.length} of {segments.length} activities</span> get crowded:
            </p>
            {highNames.length > 0 && (
              <ul className="mt-1 space-y-1">
                {highNames.map((name, i) => {
                  const seg = highCrowd[i];
                  return (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className={`shrink-0 mt-1 w-1.5 h-1.5 rounded-full ${
                        seg.crowdPressure!.level === "extreme" ? "bg-red-400" : "bg-orange-400"
                      }`} />
                      <span>
                        <span className="font-semibold">{name}</span>
                        {" — "}{seg.crowdPressure!.tip}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {bestSeason && worstSeason && bestSeason !== worstSeason && (
          <p className="text-sm text-gray-700">
            This itinerary is <span className="font-semibold text-green-600">much quieter in {cap(bestSeason)}</span> vs {cap(worstSeason)}.
          </p>
        )}

        {nudgeCount > 0 && (
          <p className="text-xs text-teal">
            {nudgeCount} less-crowded alternative{nudgeCount > 1 ? "s" : ""} suggested below — look for the <span className="font-semibold">&quot;Consider&quot;</span> tips.
          </p>
        )}
      </div>
    </div>
  );
}
