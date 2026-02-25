interface CostEstimate {
  level: "budget" | "mid-range" | "luxury";
  perPersonPerDay: number;
  currency: string;
  breakdown: Record<string, number>;
  notes?: string;
}

const LEVEL_STYLES: Record<string, { label: string; color: string }> = {
  budget: { label: "Budget", color: "bg-green-100 text-green-700" },
  "mid-range": { label: "Mid-Range", color: "bg-amber-100 text-amber-700" },
  luxury: { label: "Luxury", color: "bg-copper/10 text-copper" },
};

const BREAKDOWN_COLORS: Record<string, string> = {
  accommodation: "bg-teal",
  food: "bg-copper",
  activities: "bg-amber-500",
  transport: "bg-gray-400",
};

export default function CostEstimator({ costEstimate, durationDays }: { costEstimate: CostEstimate; durationDays: number }) {
  const level = LEVEL_STYLES[costEstimate.level] || LEVEL_STYLES["mid-range"];
  const total = costEstimate.perPersonPerDay * durationDays;
  const breakdownEntries = Object.entries(costEstimate.breakdown);
  const breakdownTotal = breakdownEntries.reduce((sum, [, val]) => sum + val, 0);

  return (
    <div className="bg-cream rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">Budget Estimate</h3>
        <span className={`text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-0.5 rounded-full ${level.color}`}>
          {level.label}
        </span>
      </div>

      <p className="text-2xl font-bold text-body">
        ~${costEstimate.perPersonPerDay}<span className="text-sm font-normal text-gray-500">/person/day</span>
      </p>

      {/* Stacked bar */}
      <div className="flex rounded-full overflow-hidden h-3 mt-4">
        {breakdownEntries.map(([key, val]) => (
          <div
            key={key}
            className={`${BREAKDOWN_COLORS[key] || "bg-gray-300"}`}
            style={{ width: `${(val / breakdownTotal) * 100}%` }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
        {breakdownEntries.map(([key, val]) => (
          <span key={key} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className={`w-2.5 h-2.5 rounded-full ${BREAKDOWN_COLORS[key] || "bg-gray-300"}`} />
            <span className="capitalize">{key}</span> ${val}
          </span>
        ))}
      </div>

      {/* Trip total */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
        <span className="text-sm text-gray-500">Trip total ({durationDays} {durationDays === 1 ? "day" : "days"})</span>
        <span className="text-lg font-bold text-teal">${total.toLocaleString()} {costEstimate.currency}</span>
      </div>

      {costEstimate.notes && (
        <p className="text-xs text-gray-400 mt-2">{costEstimate.notes}</p>
      )}
    </div>
  );
}
