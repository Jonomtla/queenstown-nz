import Image from "next/image";
import Link from "next/link";
import ContributorBadge from "./ContributorBadge";
import ReactionButtons from "./ReactionButtons";
import SaveButton from "./SaveButton";

const TRAVELLER_LABELS: Record<string, { label: string; icon: string }> = {
  family: { label: "Family", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  couple: { label: "Couple", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  solo: { label: "Solo", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  group: { label: "Group", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
};

const AGE_LABELS: Record<string, string> = {
  "all-ages": "All Ages",
  "ages-3+": "Ages 3+",
  "ages-5+": "Ages 5+",
  "ages-8+": "Ages 8+",
  "teens+": "Teens+",
  "adults-only": "Adults Only",
};

const ENDORSEMENT_VERBS: Record<string, string> = {
  family: "families tried this",
  couple: "couples loved this",
  solo: "solo travellers did this",
  group: "groups tried this",
};

const BUDGET_STYLES: Record<string, { label: string; color: string }> = {
  budget: { label: "$", color: "bg-green-100 text-green-700" },
  "mid-range": { label: "$$", color: "bg-amber-100 text-amber-700" },
  luxury: { label: "$$$", color: "bg-copper/10 text-copper" },
};

interface ItineraryCardProps {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  duration: string;
  tripDate: string;
  categories: string[];
  upvotes: number;
  reactions?: { stayLonger: number; confirmed: number; contextMatters: number };
  commentCount: number;
  contributor: {
    name: string;
    slug: string;
    avatar: string;
    type: "local" | "visitor" | "creator";
  };
  travellerType?: string;
  endorsements?: Record<string, number>;
  activeTraveller?: string;
  minAge?: string;
  photoCount?: number;
  budgetLevel?: string;
  ecoTag?: string;
}

export default function ItineraryCard({
  slug,
  title,
  summary,
  coverImage,
  duration,
  categories,
  upvotes,
  reactions,
  commentCount,
  contributor,
  travellerType,
  endorsements,
  activeTraveller,
  minAge,
  photoCount,
  budgetLevel,
  ecoTag,
}: ItineraryCardProps) {
  const traveller = travellerType ? TRAVELLER_LABELS[travellerType] : null;

  const endorsementKey = activeTraveller && activeTraveller !== "all" ? activeTraveller : travellerType;
  const endorsementCount = endorsementKey && endorsements ? endorsements[endorsementKey] : null;
  const endorsementVerb = endorsementKey ? ENDORSEMENT_VERBS[endorsementKey] : null;

  return (
    <div className="group rounded-2xl overflow-hidden bg-cream hover:shadow-lg transition-shadow">
      <Link href={`/community/${slug}/`}>
        <div className="relative h-[220px]">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10" />
          <div className="absolute top-3 left-3 flex gap-1.5 z-20">
            {categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="bg-white/90 text-teal text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
          {photoCount && photoCount > 0 && (
            <span className="absolute bottom-3 right-3 z-20 bg-black/60 text-white text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {photoCount}
            </span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <ContributorBadge
            name={contributor.name}
            slug={contributor.slug}
            avatar={contributor.avatar}
            type={contributor.type}
          />
          <div className="flex items-center gap-2">
            {traveller && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest-custom uppercase text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={traveller.icon} />
                </svg>
                {traveller.label}
              </span>
            )}
            {budgetLevel && BUDGET_STYLES[budgetLevel] && (
              <span className={`text-[10px] font-semibold tracking-widest-custom uppercase px-2 py-0.5 rounded-full ${BUDGET_STYLES[budgetLevel].color}`}>
                {BUDGET_STYLES[budgetLevel].label}
              </span>
            )}
            <span className="text-[10px] text-gray-400 tracking-widest-custom uppercase">{duration}</span>
          </div>
        </div>

        {/* Age badge for family itineraries */}
        {travellerType === "family" && minAge && (
          <span className="inline-block text-[10px] font-semibold tracking-widest-custom uppercase text-teal bg-teal/10 px-2.5 py-0.5 rounded-full mb-1">
            {AGE_LABELS[minAge] || minAge}
          </span>
        )}

        {ecoTag && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest-custom uppercase text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full mb-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {ecoTag}
          </span>
        )}

        <Link href={`/community/${slug}/`}>
          <h3 className="text-lg font-bold text-teal mt-1 group-hover:text-teal-light transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">{summary}</p>

        {/* Social proof badge */}
        {endorsementCount && endorsementCount > 0 && endorsementVerb && (
          <p className="text-xs text-copper font-semibold mt-2">
            {endorsementCount} {endorsementVerb}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
          <ReactionButtons reactions={reactions || { stayLonger: Math.round(upvotes * 0.6), confirmed: Math.round(upvotes * 0.8), contextMatters: Math.round(upvotes * 0.15) }} />
          <div className="flex items-center gap-3">
            <SaveButton itemId={slug} itemType="itinerary" title={title} variant="compact" />
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500" aria-label={`${commentCount} comments`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {commentCount}
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}
