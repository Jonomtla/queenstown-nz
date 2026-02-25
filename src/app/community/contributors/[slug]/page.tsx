import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import ItineraryCard from "@/components/community/ItineraryCard";
import RecommendationCard from "@/components/community/RecommendationCard";
import contributorsData from "@/data/community-contributors.json";
import itinerariesData from "@/data/community-itineraries.json";
import recommendationsData from "@/data/community-recommendations.json";

type Contributor = {
  name: string;
  avatar: string;
  type: "local" | "visitor" | "creator";
  travellerProfile?: string;
  location?: string;
  bio: string;
  memberSince: string;
  contributions: number;
  upvotesReceived: number;
};

const contributors = contributorsData as Record<string, Contributor>;
const itineraries = itinerariesData as Record<string, {
  title: string; contributorSlug: string; tripDate: string; duration: string;
  durationDays: number; travellerType: string; categories: string[];
  season: string; summary: string; coverImage: string;
  upvotes: number; commentCount: number;
  endorsements?: Record<string, number>;
}>;
const recommendations = recommendationsData as Record<string, {
  title: string; contributorSlug: string; category: string; season?: string;
  text: string; upvotes: number; commentCount: number; date: string;
  places?: { name: string; listingSlug?: string }[];
  comments?: { author: string; authorSlug: string; authorType: string; date: string; text: string }[];
}>;

const TYPE_LABELS: Record<string, string> = {
  local: "Local",
  visitor: "Visitor",
  creator: "Creator",
};

export function generateStaticParams() {
  return Object.keys(contributors).map((slug) => ({ slug }));
}

export default async function ContributorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contributor = contributors[slug];
  if (!contributor) return notFound();

  const contribItineraries = Object.entries(itineraries)
    .filter(([, it]) => it.contributorSlug === slug)
    .map(([s, it]) => ({ slug: s, ...it }));

  const contribRecommendations = Object.entries(recommendations)
    .filter(([, rec]) => rec.contributorSlug === slug)
    .map(([s, rec]) => ({ slug: s, ...rec }));

  return (
    <PageLayout>
      {/* Profile header */}
      <section className="bg-teal px-8 md:px-20 lg:px-24 pt-32 pb-12">
        <div className="container-wide flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden relative shrink-0 border-4 border-white/20">
            <Image src={contributor.avatar} alt={contributor.name} fill className="object-cover" unoptimized />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest-custom uppercase">
                {contributor.name}
              </h1>
              <span
                className={`text-xs font-semibold tracking-widest-custom uppercase px-3 py-1 rounded-full ${
                  contributor.type === "local"
                    ? "bg-white/20 text-white"
                    : contributor.type === "creator"
                      ? "bg-copper/80 text-white"
                      : "bg-white/10 text-white/80"
                }`}
              >
                {TYPE_LABELS[contributor.type]}
              </span>
            </div>
            {contributor.location && (
              <p className="text-white/60 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {contributor.location}
              </p>
            )}
            <p className="text-white/80 mt-3 max-w-2xl leading-relaxed">{contributor.bio}</p>
            {contributor.travellerProfile && (
              <p className="text-white/60 text-sm mt-2 italic">{contributor.travellerProfile}</p>
            )}
            <div className="flex items-center gap-6 mt-4 text-sm text-white/50">
              <span>Member since {contributor.memberSince}</span>
              <span>{contributor.contributions} contributions</span>
              <span>{contributor.upvotesReceived} upvotes received</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <Link href="/community/" className="hover:text-teal">Community</Link>
          <span>/</span>
          <span className="text-gray-700">{contributor.name}</span>
        </nav>
      </div>

      {/* Contributions */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide">
          {contribItineraries.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-teal tracking-widest-custom uppercase mb-6">
                Itineraries
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {contribItineraries.map((it) => (
                  <ItineraryCard
                    key={it.slug}
                    slug={it.slug}
                    title={it.title}
                    summary={it.summary}
                    coverImage={it.coverImage}
                    duration={it.duration}
                    tripDate={it.tripDate}
                    categories={it.categories}
                    upvotes={it.upvotes}
                    commentCount={it.commentCount}
                    contributor={{ ...contributor, slug }}
                    travellerType={it.travellerType}
                    endorsements={it.endorsements}
                  />
                ))}
              </div>
            </>
          )}

          {contribRecommendations.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-teal tracking-widest-custom uppercase mb-6">
                Recommendations
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contribRecommendations.map((rec) => (
                  <RecommendationCard
                    key={rec.slug}
                    slug={rec.slug}
                    title={rec.title}
                    text={rec.text}
                    category={rec.category}
                    upvotes={rec.upvotes}
                    commentCount={rec.commentCount}
                    date={rec.date}
                    contributor={{ ...contributor, slug }}
                    places={rec.places}
                    comments={rec.comments}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
