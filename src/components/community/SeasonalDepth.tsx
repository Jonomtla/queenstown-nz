"use client";

const SEASONAL_EXCLUSIVES: Record<string, { tagline: string; experiences: { title: string; why: string }[]; stayNudge: string }> = {
  summer: {
    tagline: "Summer-only experiences you'll miss if you rush",
    experiences: [
      { title: "Glenorchy Dart River Jet Boat", why: "Only runs Nov-Apr. Braided river channels at their best." },
      { title: "Lake Alta Alpine Swim", why: "Glacial lake above The Remarkables — accessible only Dec-Mar." },
      { title: "Gibbston Harvest Festival", why: "February only. 20+ wineries, live music, long tables." },
    ],
    stayNudge: "Summer days are long — 16 hours of daylight means you can fit more in. One extra day goes further than you think.",
  },
  autumn: {
    tagline: "Autumn gold doesn't last — these moments are fleeting",
    experiences: [
      { title: "Arrowtown Autumn Festival", why: "Late April only. The whole town turns gold and celebrates." },
      { title: "Crown Range Colours Drive", why: "Peak colour 3rd week of April. Misty mornings, golden valleys." },
      { title: "Harvest Wine Dinners", why: "March-May. Winemakers host long-table dinners in the vineyard." },
    ],
    stayNudge: "Autumn colour shifts daily. Stay an extra day and you'll see a completely different landscape.",
  },
  winter: {
    tagline: "Winter-exclusive — these close when the snow melts",
    experiences: [
      { title: "Night Skiing at Coronet Peak", why: "Friday/Saturday nights, Jun-Sep only. Ski under the lights." },
      { title: "Onsen Hot Pools Under Snow", why: "Steaming pools with snow-capped mountains. Pure winter magic." },
      { title: "Cardrona Après Ski", why: "The Captain's cabin, mulled wine, live music. Only in season." },
    ],
    stayNudge: "Snow conditions change daily. An extra day gives you the flexibility to hit the best conditions.",
  },
  spring: {
    tagline: "Spring secrets — catch Queenstown before the crowds arrive",
    experiences: [
      { title: "Wildflower Walks", why: "Queenstown Hill and Ben Lomond bloom Sep-Nov. Few tourists around." },
      { title: "Spring Lamb at Amisfield", why: "Seasonal menu highlight. Josh's team does something special." },
      { title: "Wakatipu Basin Morning Mist", why: "Best photography conditions of the year. Crisp, clear, golden." },
    ],
    stayNudge: "Spring is Queenstown's best-kept secret — uncrowded, affordable, and beautiful. Stretch your trip while you can.",
  },
};

function getCurrentNZSeason(): string {
  const month = new Date().getMonth() + 1;
  if ([12, 1, 2].includes(month)) return "summer";
  if ([3, 4, 5].includes(month)) return "autumn";
  if ([6, 7, 8].includes(month)) return "winter";
  return "spring";
}

export default function SeasonalDepth() {
  const season = getCurrentNZSeason();
  const data = SEASONAL_EXCLUSIVES[season];
  if (!data) return null;

  const seasonColors: Record<string, { bg: string; border: string; accent: string; dot: string }> = {
    summer: { bg: "bg-amber-50", border: "border-amber-200", accent: "text-amber-700", dot: "bg-amber-400" },
    autumn: { bg: "bg-orange-50", border: "border-orange-200", accent: "text-orange-700", dot: "bg-orange-400" },
    winter: { bg: "bg-blue-50", border: "border-blue-200", accent: "text-blue-700", dot: "bg-blue-400" },
    spring: { bg: "bg-green-50", border: "border-green-200", accent: "text-green-700", dot: "bg-green-400" },
  };

  const colors = seasonColors[season];

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-xl p-6`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse`} />
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">
          {season.charAt(0).toUpperCase() + season.slice(1)} Only
        </h3>
      </div>

      <p className={`text-xs ${colors.accent} font-semibold mb-4`}>{data.tagline}</p>

      <div className="space-y-3">
        {data.experiences.map((exp, i) => (
          <div key={i} className="flex items-start gap-2">
            <svg className={`w-3.5 h-3.5 ${colors.accent} shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-body">{exp.title}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{exp.why}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-500 mt-4 pt-3 border-t border-gray-200 leading-relaxed italic">
        {data.stayNudge}
      </p>
    </div>
  );
}
