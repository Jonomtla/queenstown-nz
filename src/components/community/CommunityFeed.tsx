"use client";

import { useState, useMemo } from "react";
import ItineraryCard from "./ItineraryCard";
import RecommendationCard from "./RecommendationCard";
import CommunityFilterBar from "./CommunityFilterBar";
import TripMatcher from "./TripMatcher";
import SeasonalBanner from "./SeasonalBanner";
import SavedTripBar from "./SavedTripBar";
import itinerariesData from "@/data/community-itineraries.json";
import recommendationsData from "@/data/community-recommendations.json";
import contributorsData from "@/data/community-contributors.json";

type Contributor = {
  name: string;
  avatar: string;
  type: "local" | "visitor" | "creator";
};

const contributors = contributorsData as Record<string, Contributor>;
const itineraries = itinerariesData as Record<string, {
  title: string;
  contributorSlug: string;
  tripDate: string;
  duration: string;
  durationDays: number;
  travellerType: string;
  categories: string[];
  season: string;
  summary: string;
  coverImage: string;
  upvotes: number;
  commentCount: number;
  endorsements?: Record<string, number>;
  days: { segments: { ageRange?: string }[] }[];
  reactions?: { stayLonger: number; confirmed: number; contextMatters: number };
  photos?: { src: string; caption: string }[];
  costEstimate?: { level: string };
}>;
const recommendations = recommendationsData as Record<string, {
  title: string;
  contributorSlug: string;
  category: string;
  season?: string;
  travellerType?: string;
  text: string;
  upvotes: number;
  commentCount: number;
  date: string;
  places?: { name: string; listingSlug?: string }[];
  reactions?: { stayLonger: number; confirmed: number; contextMatters: number };
  comments?: { author: string; authorSlug: string; authorType: string; date: string; text: string }[];
  photos?: { src: string; caption: string }[];
}>;

function matchDuration(durationDays: number, filter: string): boolean {
  switch (filter) {
    case "day": return durationDays === 1;
    case "weekend": return durationDays >= 2 && durationDays <= 3;
    case "midweek": return durationDays >= 3 && durationDays <= 5;
    case "week": return durationDays >= 6;
    default: return true;
  }
}

interface CommunityFeedProps {
  initialCategory?: string;
  initialSeason?: string;
  initialTraveller?: string;
}

export default function CommunityFeed({ initialCategory, initialSeason, initialTraveller }: CommunityFeedProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [activeTraveller, setActiveTraveller] = useState(initialTraveller || "all");
  const [activeSeason, setActiveSeason] = useState(initialSeason || "all");
  const [activeDuration, setActiveDuration] = useState("all");
  const [activeSort, setActiveSort] = useState("popular");

  const filteredItems = useMemo(() => {
    const items: { type: "itinerary" | "recommendation"; slug: string; upvotes: number; stayLonger: number; date: string }[] = [];

    for (const [slug, it] of Object.entries(itineraries)) {
      const contrib = contributors[it.contributorSlug];
      if (!contrib) continue;
      if (activeCategory !== "all" && !it.categories.includes(activeCategory)) continue;
      if (activeTraveller !== "all" && it.travellerType !== activeTraveller) continue;
      if (activeSeason !== "all" && it.season !== activeSeason) continue;
      if (activeDuration !== "all" && !matchDuration(it.durationDays, activeDuration)) continue;
      items.push({ type: "itinerary", slug, upvotes: it.upvotes, stayLonger: it.reactions?.stayLonger || it.upvotes, date: it.tripDate });
    }

    for (const [slug, rec] of Object.entries(recommendations)) {
      const contrib = contributors[rec.contributorSlug];
      if (!contrib) continue;
      if (activeCategory !== "all" && rec.category !== activeCategory) continue;
      if (activeTraveller !== "all" && rec.travellerType !== activeTraveller) continue;
      if (activeSeason !== "all" && rec.season !== activeSeason && rec.season !== undefined) continue;
      items.push({ type: "recommendation", slug, upvotes: rec.upvotes, stayLonger: rec.reactions?.stayLonger || rec.upvotes, date: rec.date });
    }

    items.sort((a, b) =>
      activeSort === "popular"
        ? b.stayLonger - a.stayLonger
        : b.date.localeCompare(a.date)
    );

    return items;
  }, [activeCategory, activeTraveller, activeSeason, activeDuration, activeSort]);

  return (
    <div>
      <SeasonalBanner activeSeason={activeSeason} onSeasonChange={setActiveSeason} />

      <TripMatcher
        activeTraveller={activeTraveller}
        activeDuration={activeDuration}
        activeSeason={activeSeason}
        onTravellerChange={setActiveTraveller}
        onDurationChange={setActiveDuration}
        onSeasonChange={setActiveSeason}
      />

      <CommunityFilterBar
        activeCategory={activeCategory}
        activeSort={activeSort}
        onCategoryChange={setActiveCategory}
        onSortChange={setActiveSort}
      />

      <div className="mt-8 grid md:grid-cols-2 gap-6" aria-live="polite">
        {filteredItems.map((item) => {
          if (item.type === "itinerary") {
            const it = itineraries[item.slug];
            const contrib = contributors[it.contributorSlug];
            return (
              <ItineraryCard
                key={item.slug}
                slug={item.slug}
                title={it.title}
                summary={it.summary}
                coverImage={it.coverImage}
                duration={it.duration}
                tripDate={it.tripDate}
                categories={it.categories}
                upvotes={it.upvotes}
                reactions={it.reactions}
                commentCount={it.commentCount}
                contributor={{ ...contrib, slug: it.contributorSlug }}
                travellerType={it.travellerType}
                endorsements={it.endorsements}
                activeTraveller={activeTraveller}
                minAge={getMinAge(it.days)}
                photoCount={it.photos?.length}
                budgetLevel={it.costEstimate?.level}
              />
            );
          }
          const rec = recommendations[item.slug];
          const contrib = contributors[rec.contributorSlug];
          return (
            <RecommendationCard
              key={item.slug}
              slug={item.slug}
              title={rec.title}
              text={rec.text}
              category={rec.category}
              upvotes={rec.upvotes}
              reactions={rec.reactions}
              commentCount={rec.commentCount}
              date={rec.date}
              contributor={{ ...contrib, slug: rec.contributorSlug }}
              places={rec.places}
              comments={rec.comments}
              photos={rec.photos}
            />
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No results match your filters. Try broadening your search.</p>
        </div>
      )}

      <SavedTripBar />
    </div>
  );
}

function getMinAge(days: { segments: { ageRange?: string }[] }[]): string | undefined {
  const ageOrder = ["all-ages", "ages-3+", "ages-5+", "ages-8+", "teens+", "adults-only"];
  let minIndex = -1;
  for (const day of days) {
    for (const seg of day.segments) {
      if (seg.ageRange) {
        const idx = ageOrder.indexOf(seg.ageRange);
        if (idx > minIndex) minIndex = idx;
      }
    }
  }
  return minIndex >= 0 ? ageOrder[minIndex] : undefined;
}
