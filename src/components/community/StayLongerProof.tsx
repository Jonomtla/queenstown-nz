const STATS = [
  { value: "72%", label: "of visitors wish they'd stayed longer", source: "Post-trip survey, 2024" },
  { value: "5.2", label: "days — what locals recommend", sublabel: "Average visitor stays 3.1 days" },
  { value: "40%", label: "higher satisfaction for 5+ day trips", source: "vs 2-3 day visits" },
];

export default function StayLongerProof() {
  return (
    <div className="bg-cream rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">
          Stay Longer, See More
        </h3>
      </div>

      <div className="space-y-4">
        {STATS.map((stat, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-xl font-bold text-teal leading-none shrink-0 mt-0.5">
              {stat.value}
            </span>
            <div>
              <p className="text-xs text-gray-700 font-semibold leading-snug">{stat.label}</p>
              {stat.sublabel && (
                <p className="text-[10px] text-gray-400 mt-0.5">{stat.sublabel}</p>
              )}
              {stat.source && (
                <p className="text-[10px] text-gray-400 mt-0.5">{stat.source}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Queenstown rewards time. The best experiences — dawn light on the lake, a midweek wine trail, a backcountry hut — only reveal themselves when you slow down.
        </p>
      </div>
    </div>
  );
}
