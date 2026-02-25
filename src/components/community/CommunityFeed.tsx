"use client";

import { useState, useMemo } from "react";
import ItineraryCard from "./ItineraryCard";
import RecommendationCard from "./RecommendationCard";
import CommunityFilterBar from "./CommunityFilterBar";
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
  categories: string[];
  season: string;
  summary: string;
  coverImage: string;
  upvotes: number;
  commentCount: number;
}>;
const recommendations = recommendationsData as Record<string, {
  title: string;
  contributorSlug: string;
  category: string;
  season?: string;
  text: string;
  upvotes: number;
  commentCount: number;
  date: string;
  places?: { name: string; listingSlug?: string }[];
  comments?: { author: string; authorSlug: string; authorType: string; date: string; text: string }[];
}>;

interface CommunityFeedProps {
  initialCategory?: string;
  initialSeason?: string;
  initialType?: string;
}

export default function CommunityFeed({ initialCategory, initialSeason, initialType }: CommunityFeedProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [activeType, setActiveType] = useState(initialType || "all");
  const [activeSeason, setActiveSeason] = useState(initialSeason || "all");
  const [activeSort, setActiveSort] = useState("popular");

  const filteredItems = useMemo(() => {
    const items: { type: "itinerary" | "recommendation"; slug: string; upvotes: number; date: string }[] = [];

    for (const [slug, it] of Object.entries(itineraries)) {
      const contrib = contributors[it.contributorSlug];
      if (!contrib) continue;
      if (activeCategory !== "all" && !it.categories.includes(activeCategory)) continue;
      if (activeType !== "all" && contrib.type !== activeType) continue;
      if (activeSeason !== "all" && it.season !== activeSeason) continue;
      items.push({ type: "itinerary", slug, upvotes: it.upvotes, date: it.tripDate });
    }

    for (const [slug, rec] of Object.entries(recommendations)) {
      const contrib = contributors[rec.contributorSlug];
      if (!contrib) continue;
      if (activeCategory !== "all" && rec.category !== activeCategory) continue;
      if (activeType !== "all" && contrib.type !== activeType) continue;
      if (activeSeason !== "all" && rec.season !== activeSeason && rec.season !== undefined) continue;
      items.push({ type: "recommendation", slug, upvotes: rec.upvotes, date: rec.date });
    }

    items.sort((a, b) =>
      activeSort === "popular"
        ? b.upvotes - a.upvotes
        : b.date.localeCompare(a.date)
    );

    return items;
  }, [activeCategory, activeType, activeSeason, activeSort]);

  return (
    <div>
      <CommunityFilterBar
        activeCategory={activeCategory}
        activeType={activeType}
        activeSeason={activeSeason}
        activeSort={activeSort}
        onCategoryChange={setActiveCategory}
        onTypeChange={setActiveType}
        onSeasonChange={setActiveSeason}
        onSortChange={setActiveSort}
      />

      <div className="mt-8 grid md:grid-cols-2 gap-6">
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
                commentCount={it.commentCount}
                contributor={{ ...contrib, slug: it.contributorSlug }}
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
              commentCount={rec.commentCount}
              date={rec.date}
              contributor={{ ...contrib, slug: rec.contributorSlug }}
              places={rec.places}
              comments={rec.comments}
            />
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No results match your filters. Try broadening your search.</p>
        </div>
      )}
    </div>
  );
}
