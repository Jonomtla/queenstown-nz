import Link from "next/link";
import itinerariesData from "@/data/community-itineraries.json";
import recommendationsData from "@/data/community-recommendations.json";
import contributorsData from "@/data/community-contributors.json";
import ItineraryCard from "./ItineraryCard";
import RecommendationCard from "./RecommendationCard";

type Contributor = { name: string; avatar: string; type: "local" | "visitor" | "creator" };
const contributors = contributorsData as Record<string, Contributor>;
const itineraries = itinerariesData as Record<string, {
  title: string; contributorSlug: string; tripDate: string; duration: string;
  categories: string[]; season: string; summary: string; coverImage: string;
  upvotes: number; commentCount: number;
}>;
const recommendations = recommendationsData as Record<string, {
  title: string; contributorSlug: string; category: string; season?: string;
  text: string; upvotes: number; commentCount: number; date: string;
  places?: { name: string; listingSlug?: string }[];
  comments?: { author: string; authorSlug: string; authorType: string; date: string; text: string }[];
}>;

interface CommunityContentStripProps {
  category: string;
  heading?: string;
  maxItems?: number;
}

export default function CommunityContentStrip({ category, heading, maxItems = 3 }: CommunityContentStripProps) {
  const categoryLower = category.toLowerCase();

  // Find matching itineraries
  const matchingItineraries = Object.entries(itineraries)
    .filter(([, it]) => it.categories.some((c) => c.toLowerCase().includes(categoryLower)))
    .sort(([, a], [, b]) => b.upvotes - a.upvotes)
    .slice(0, maxItems);

  // Find matching recommendations
  const matchingRecs = Object.entries(recommendations)
    .filter(([, rec]) => rec.category.toLowerCase().includes(categoryLower))
    .sort(([, a], [, b]) => b.upvotes - a.upvotes)
    .slice(0, maxItems);

  // Combine and take top items
  const allItems: { type: "itinerary" | "recommendation"; slug: string; upvotes: number }[] = [
    ...matchingItineraries.map(([slug, it]) => ({ type: "itinerary" as const, slug, upvotes: it.upvotes })),
    ...matchingRecs.map(([slug, rec]) => ({ type: "recommendation" as const, slug, upvotes: rec.upvotes })),
  ]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, maxItems);

  if (allItems.length === 0) return null;

  return (
    <section className="bg-cream px-8 md:px-20 lg:px-24 py-16">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-teal tracking-widest-custom uppercase">
            {heading || `What Locals Are Saying`}
          </h2>
          <Link
            href="/community/"
            className="text-xs font-semibold tracking-widest-custom uppercase text-copper hover:text-copper/80 transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allItems.map((item) => {
            if (item.type === "itinerary") {
              const it = itineraries[item.slug];
              const contrib = contributors[it.contributorSlug];
              if (!contrib) return null;
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
            if (!contrib) return null;
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
      </div>
    </section>
  );
}
