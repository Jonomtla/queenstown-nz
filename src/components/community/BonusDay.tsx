import Link from "next/link";
import itinerariesData from "@/data/community-itineraries.json";

type ItineraryData = {
  title: string;
  categories: string[];
  season: string;
  durationDays: number;
  days: { segments: { title: string; description: string; places: { name: string; listingSlug?: string }[] }[] }[];
  [key: string]: unknown;
};

const itineraries = itinerariesData as Record<string, ItineraryData>;

// Curated bonus day suggestions by category/season
const BONUS_SUGGESTIONS: { title: string; description: string; matchCategories: string[]; matchSeasons: string[] }[] = [
  {
    title: "Glenorchy & Paradise Day Trip",
    description: "45 minutes from Queenstown lies one of NZ's most dramatic landscapes. Dart River jet boat, Routeburn Track day walk, or simply drive the scenic route and stop at every viewpoint.",
    matchCategories: ["hiking", "outdoor", "adventure", "photography"],
    matchSeasons: ["summer", "autumn"],
  },
  {
    title: "Gibbston Valley Wine Day",
    description: "Queenstown's backyard wine region. Cycle the trail between 4 cellar doors, do a cave tasting at Gibbston Valley, and finish with a long lunch at Kinross.",
    matchCategories: ["dining", "wine", "culture"],
    matchSeasons: ["summer", "autumn", "spring"],
  },
  {
    title: "Milford Sound Day Trip",
    description: "Yes, it's a long drive — but it's worth an extra day. Depart 7am, cruise the fiord, spot seals and dolphins. Most visitors say it's the highlight of their entire NZ trip.",
    matchCategories: ["outdoor", "adventure", "hiking", "photography"],
    matchSeasons: ["summer", "autumn", "spring"],
  },
  {
    title: "Arrowtown Heritage Walk & Spa",
    description: "Wander the historic Chinese settlement, browse the galleries, grab lunch at Provisions, then unwind at Onsen Hot Pools as the sun sets over the canyon.",
    matchCategories: ["walking", "culture", "history", "wellness", "luxury"],
    matchSeasons: ["autumn", "winter", "spring"],
  },
  {
    title: "Cardrona & Wanaka Day Trip",
    description: "Drive the Crown Range for jaw-dropping views, stop at the Cardrona Hotel, explore Wanaka's lakefront, and visit Puzzling World. Different vibe, same mountain magic.",
    matchCategories: ["skiing", "winter", "adventure", "family"],
    matchSeasons: ["winter"],
  },
  {
    title: "Queenstown Trail Cycling",
    description: "60km of flat, scenic trails connecting Queenstown, Arrowtown, and Gibbston. Rent e-bikes and cover all three in a day with stops for coffee and wine.",
    matchCategories: ["outdoor", "summer", "adventure"],
    matchSeasons: ["summer", "spring"],
  },
];

function getActivityNames(it: ItineraryData): string[] {
  return it.days.flatMap(d => d.segments.map(s => s.title)).filter(Boolean);
}

function getBonusSuggestions(slug: string, itinerary: ItineraryData): typeof BONUS_SUGGESTIONS {
  const existingActivities = getActivityNames(itinerary).map(n => n.toLowerCase());

  return BONUS_SUGGESTIONS
    .filter(s => {
      // Match by category or season overlap
      const catMatch = s.matchCategories.some(c => itinerary.categories.includes(c));
      const seasonMatch = s.matchSeasons.includes(itinerary.season);
      // Don't suggest something already in the itinerary
      const alreadyIncluded = existingActivities.some(a => s.title.toLowerCase().includes(a) || a.includes(s.title.toLowerCase()));
      return (catMatch || seasonMatch) && !alreadyIncluded;
    })
    .slice(0, 3);
}

// Find related itineraries that extend the experience
function getExtendItineraries(currentSlug: string, itinerary: ItineraryData): { slug: string; title: string; durationDays: number }[] {
  return Object.entries(itineraries)
    .filter(([slug, it]) => {
      if (slug === currentSlug) return false;
      // Same season or overlapping categories
      const catOverlap = it.categories.some(c => itinerary.categories.includes(c));
      return catOverlap || it.season === itinerary.season;
    })
    .map(([slug, it]) => ({ slug, title: it.title, durationDays: it.durationDays }))
    .slice(0, 2);
}

export default function BonusDay({ slug, itinerary }: { slug: string; itinerary: ItineraryData }) {
  const suggestions = getBonusSuggestions(slug, itinerary);
  const extendTrips = getExtendItineraries(slug, itinerary);

  if (suggestions.length === 0 && extendTrips.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-teal/5 to-copper/5 border border-teal/20 rounded-2xl p-6 md:p-8 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-teal">If You Had One More Day...</h3>
          <p className="text-xs text-gray-500">72% of visitors wish they&apos;d stayed longer. Here&apos;s what you could add.</p>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-4 mb-6">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                +{i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-body">{s.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {extendTrips.length > 0 && (
        <div className="pt-4 border-t border-teal/10">
          <p className="text-xs font-semibold tracking-widest-custom uppercase text-gray-400 mb-3">
            Or combine with another itinerary
          </p>
          <div className="flex flex-wrap gap-2">
            {extendTrips.map((trip) => (
              <Link
                key={trip.slug}
                href={`/community/${trip.slug}/`}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-semibold text-teal hover:border-teal/40 hover:bg-teal/5 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {trip.title}
                <span className="text-gray-400 font-normal">+{trip.durationDays}d</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="text-[10px] text-gray-400 mt-5 text-center">
        Average trip: 3 days. Locals recommend: 5+ days. Every extra day unlocks more of what makes Queenstown special.
      </p>
    </div>
  );
}
