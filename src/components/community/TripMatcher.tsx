"use client";

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
      className={`text-xs font-semibold tracking-widest-custom uppercase px-4 py-2 rounded-full transition-colors ${
        active
          ? "bg-white text-teal"
          : "bg-white/20 text-white hover:bg-white/30"
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
  const hasSelection = activeTraveller !== "all" || activeDuration !== "all" || activeSeason !== "all";

  function handleClear() {
    onTravellerChange("all");
    onDurationChange("all");
    onSeasonChange("all");
  }

  return (
    <div className="bg-teal rounded-2xl p-6 md:p-8 mb-8">
      <div className="flex items-center justify-between mb-5">
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

      <div className="space-y-4">
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
      </div>
    </div>
  );
}
