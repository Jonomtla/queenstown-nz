"use client";

interface CommunityFilterBarProps {
  activeCategory: string;
  activeTraveller: string;
  activeSeason: string;
  activeSort: string;
  onCategoryChange: (v: string) => void;
  onTravellerChange: (v: string) => void;
  onSeasonChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "skiing", label: "Skiing" },
  { value: "dining", label: "Dining" },
  { value: "adventure", label: "Adventure" },
  { value: "family", label: "Family" },
  { value: "walking", label: "Walking" },
  { value: "outdoor", label: "Outdoor" },
  { value: "culture", label: "Culture" },
  { value: "photography", label: "Photography" },
  { value: "luxury", label: "Luxury" },
];

const TRAVELLER_TYPES = [
  { value: "all", label: "Everyone" },
  { value: "family", label: "Family" },
  { value: "couple", label: "Couple" },
  { value: "solo", label: "Solo" },
  { value: "group", label: "Group" },
];

const SEASONS = [
  { value: "all", label: "Any Season" },
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
  { value: "spring", label: "Spring" },
];

const SORTS = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Most Recent" },
];

function PillGroup({
  items,
  active,
  onChange,
}: {
  items: { value: string; label: string }[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`text-xs font-semibold tracking-widest-custom uppercase px-4 py-2 rounded-full transition-colors ${
            active === item.value
              ? "bg-teal text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default function CommunityFilterBar({
  activeCategory,
  activeTraveller,
  activeSeason,
  activeSort,
  onCategoryChange,
  onTravellerChange,
  onSeasonChange,
  onSortChange,
}: CommunityFilterBarProps) {
  return (
    <div className="space-y-4">
      <PillGroup items={CATEGORIES} active={activeCategory} onChange={onCategoryChange} />
      <div className="flex flex-wrap items-center gap-6">
        <PillGroup items={TRAVELLER_TYPES} active={activeTraveller} onChange={onTravellerChange} />
        <div className="hidden md:block w-px h-6 bg-gray-200" />
        <PillGroup items={SEASONS} active={activeSeason} onChange={onSeasonChange} />
        <div className="hidden md:block w-px h-6 bg-gray-200" />
        <PillGroup items={SORTS} active={activeSort} onChange={onSortChange} />
      </div>
    </div>
  );
}
