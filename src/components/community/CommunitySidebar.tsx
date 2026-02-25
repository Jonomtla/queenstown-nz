import Image from "next/image";
import Link from "next/link";
import contributorsData from "@/data/community-contributors.json";
import collectionsData from "@/data/community-collections.json";

type Contributor = {
  name: string;
  avatar: string;
  type: "local" | "visitor" | "creator";
  contributions: number;
  upvotesReceived: number;
};

type Collection = {
  title: string;
  description: string;
  icon: string;
};

const contributors = contributorsData as Record<string, Contributor>;
const collections = collectionsData as Record<string, Collection>;

const topContributors = Object.entries(contributors)
  .sort(([, a], [, b]) => b.upvotesReceived - a.upvotesReceived)
  .slice(0, 5);

const ICON_PATHS: Record<string, string> = {
  child: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  "cloud-rain": "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  zap: "M13 10V3L4 14h7v7l9-11h-7z",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  backpack: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
};

const seasonalHighlights = [
  { season: "Summer", tip: "Queenstown Trail by e-bike is the locals' favourite", color: "bg-copper/10 text-copper" },
  { season: "Autumn", tip: "Arrowtown colours peak mid-April", color: "bg-copper/10 text-copper" },
  { season: "Winter", tip: "First tracks at Coronet Peak — get there by 8am", color: "bg-teal/10 text-teal" },
  { season: "Spring", tip: "Wildflowers on the Moke Lake loop from September", color: "bg-teal/10 text-teal" },
];

export default function CommunitySidebar() {
  return (
    <aside className="space-y-8">
      {/* Collections */}
      <div className="bg-cream rounded-xl p-6">
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-4">
          Collections
        </h3>
        <div className="space-y-2">
          {Object.entries(collections).map(([slug, collection]) => {
            const iconPath = ICON_PATHS[collection.icon] || ICON_PATHS.heart;
            return (
              <Link
                key={slug}
                href={`/community/collections/${slug}/`}
                className="flex items-center gap-3 group py-1.5"
              >
                <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal/20 transition-colors">
                  <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-teal transition-colors">
                  {collection.title}
                </span>
              </Link>
            );
          })}
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
