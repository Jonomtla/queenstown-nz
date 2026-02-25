import Image from "next/image";
import Link from "next/link";
import contributorsData from "@/data/community-contributors.json";
import itinerariesData from "@/data/community-itineraries.json";

type Contributor = {
  name: string;
  avatar: string;
  type: "local" | "visitor" | "creator";
  contributions: number;
  upvotesReceived: number;
};

const contributors = contributorsData as Record<string, Contributor>;
const itineraries = itinerariesData as Record<string, { title: string; upvotes: number; categories: string[] }>;

const topContributors = Object.entries(contributors)
  .sort(([, a], [, b]) => b.upvotesReceived - a.upvotesReceived)
  .slice(0, 5);

const trendingTopics = [
  { label: "Winter Skiing", href: "/community/category/skiing/" },
  { label: "Family Adventures", href: "/community/category/family/" },
  { label: "Autumn Photography", href: "/community/category/photography/" },
  { label: "Local Dining", href: "/community/category/dining/" },
  { label: "Budget Tips", href: "/community/category/budget/" },
];

const seasonalHighlights = [
  { season: "Summer", tip: "Queenstown Trail by e-bike is the locals' favourite", color: "bg-copper/10 text-copper" },
  { season: "Autumn", tip: "Arrowtown colours peak mid-April", color: "bg-copper/10 text-copper" },
  { season: "Winter", tip: "First tracks at Coronet Peak — get there by 8am", color: "bg-teal/10 text-teal" },
  { season: "Spring", tip: "Wildflowers on the Moke Lake loop from September", color: "bg-teal/10 text-teal" },
];

export default function CommunitySidebar() {
  return (
    <aside className="space-y-8">
      {/* Trending Topics */}
      <div className="bg-cream rounded-xl p-6">
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-4">
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Link
              key={topic.label}
              href={topic.href}
              className="text-xs font-semibold tracking-widest-custom uppercase px-3 py-1.5 rounded-full bg-white text-gray-600 hover:bg-teal hover:text-white transition-colors"
            >
              {topic.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-cream rounded-xl p-6">
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-4">
          Top Contributors
        </h3>
        <div className="space-y-3">
          {topContributors.map(([slug, contrib]) => (
            <Link
              key={slug}
              href={`/community/contributors/${slug}/`}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
                <Image src={contrib.avatar} alt={contrib.name} fill className="object-cover" unoptimized />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-700 group-hover:text-teal transition-colors truncate">
                  {contrib.name}
                </p>
                <p className="text-[10px] text-gray-400 tracking-widest-custom uppercase">
                  {contrib.contributions} contributions
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Seasonal Highlights */}
      <div className="bg-cream rounded-xl p-6">
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-4">
          Seasonal Tips
        </h3>
        <div className="space-y-3">
          {seasonalHighlights.map((item) => (
            <div key={item.season} className="flex items-start gap-3">
              <span className={`text-[10px] font-bold tracking-widest-custom uppercase px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${item.color}`}>
                {item.season}
              </span>
              <p className="text-sm text-gray-600 leading-snug">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
