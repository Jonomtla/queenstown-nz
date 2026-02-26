"use client";

interface CommunityFilterBarProps {
  activeCategory: string;
  activeSort: string;
  onCategoryChange: (v: string) => void;
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

const SORTS = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Most Recent" },
];

export default function CommunityFilterBar({
  activeCategory,
  activeSort,
  onCategoryChange,
  onSortChange,
}: CommunityFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex flex-wrap gap-2 flex-1 overflow-x-auto -mx-1 px-1 scrollbar-hide">
        {CATEGORIES.map((item) => (
          <button
            key={item.value}
            onClick={() => onCategoryChange(item.value)}
            aria-pressed={activeCategory === item.value}
            className={`text-xs font-semibold tracking-widest-custom uppercase px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              activeCategory === item.value
                ? "bg-teal text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 shrink-0">
        {SORTS.map((item) => (
          <button
            key={item.value}
            onClick={() => onSortChange(item.value)}
            aria-pressed={activeSort === item.value}
            className={`text-xs font-semibold tracking-widest-custom uppercase px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
              activeSort === item.value
                ? "bg-teal text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
