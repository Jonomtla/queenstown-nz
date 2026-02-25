import { notFound } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import ItineraryCard from "@/components/community/ItineraryCard";
import RecommendationCard from "@/components/community/RecommendationCard";
import collectionsData from "@/data/community-collections.json";
import itinerariesData from "@/data/community-itineraries.json";
import recommendationsData from "@/data/community-recommendations.json";
import contributorsData from "@/data/community-contributors.json";

type Contributor = {
  name: string;
  avatar: string;
  type: "local" | "visitor" | "creator";
};

type Itinerary = {
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
};

type Recommendation = {
  title: string;
  contributorSlug: string;
  category: string;
  text: string;
  upvotes: number;
  commentCount: number;
  date: string;
  places?: { name: string; listingSlug?: string }[];
  comments?: { author: string; authorSlug: string; authorType: string; date: string; text: string }[];
};

type Collection = {
  title: string;
  description: string;
  icon: string;
  itineraries: string[];
  recommendations: string[];
};

const collections = collectionsData as Record<string, Collection>;
const itineraries = itinerariesData as Record<string, Itinerary>;
const recommendations = recommendationsData as Record<string, Recommendation>;
const contributors = contributorsData as Record<string, Contributor>;

const ICON_PATHS: Record<string, string> = {
  child: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  "cloud-rain": "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  zap: "M13 10V3L4 14h7v7l9-11h-7z",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  backpack: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
};

export function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections[slug];
  if (!collection) return notFound();

  const iconPath = ICON_PATHS[collection.icon] || ICON_PATHS.heart;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-teal px-8 md:px-20 lg:px-24 py-16">
        <div className="container-wide max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest-custom uppercase">
              {collection.title}
            </h1>
          </div>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <Link href="/community/" className="hover:text-teal">Community</Link>
          <span>/</span>
          <span className="text-gray-700">{collection.title}</span>
        </nav>
      </div>

      {/* Content */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide">
          {/* Itineraries */}
          {collection.itineraries.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-teal tracking-widest-custom uppercase mb-6">
                Itineraries
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.itineraries.map((itSlug) => {
                  const it = itineraries[itSlug];
                  if (!it) return null;
                  const c = contributors[it.contributorSlug];
                  if (!c) return null;
                  return (
                    <ItineraryCard
                      key={itSlug}
                      slug={itSlug}
                      title={it.title}
                      summary={it.summary}
                      coverImage={it.coverImage}
                      duration={it.duration}
                      tripDate={it.tripDate}
                      categories={it.categories}
                      upvotes={it.upvotes}
                      commentCount={it.commentCount}
                      contributor={{ ...c, slug: it.contributorSlug }}
                      travellerType={it.travellerType}
                      endorsements={it.endorsements}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {collection.recommendations.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-teal tracking-widest-custom uppercase mb-6">
                Tips & Recommendations
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {collection.recommendations.map((recSlug) => {
                  const rec = recommendations[recSlug];
                  if (!rec) return null;
                  const c = contributors[rec.contributorSlug];
                  if (!c) return null;
                  return (
                    <RecommendationCard
                      key={recSlug}
                      slug={recSlug}
                      title={rec.title}
                      text={rec.text}
                      category={rec.category}
                      upvotes={rec.upvotes}
                      commentCount={rec.commentCount}
                      date={rec.date}
                      contributor={{ ...c, slug: rec.contributorSlug }}
                      places={rec.places}
                      comments={rec.comments}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
