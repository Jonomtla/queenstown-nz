import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import ContributorBadge from "@/components/community/ContributorBadge";
import UpvoteButton from "@/components/community/UpvoteButton";
import ItineraryDayBreakdown from "@/components/community/ItineraryDayBreakdown";
import CommentSection from "@/components/community/CommentSection";
import ItineraryCard from "@/components/community/ItineraryCard";
import AdaptItinerary from "@/components/community/AdaptItinerary";
import itinerariesData from "@/data/community-itineraries.json";
import contributorsData from "@/data/community-contributors.json";

type Contributor = {
  name: string;
  avatar: string;
  type: "local" | "visitor" | "creator";
  travellerProfile?: string;
  bio: string;
  contributions: number;
};

type Segment = {
  timeOfDay: string;
  title: string;
  description: string;
  places: { name: string; listingSlug?: string; href?: string }[];
  image?: string;
  localTip?: string;
  ageRange?: string;
};

type Adaptation = {
  swaps: {
    segmentTitle: string;
    replacement: {
      title: string;
      description: string;
      places: { name: string; listingSlug?: string; href?: string }[];
      ageRange?: string;
    };
  }[];
};

type Itinerary = {
  title: string;
  contributorSlug: string;
  tripDate: string;
  duration: string;
  durationDays: number;
  travellerType: string;
  travellerDetails?: string;
  categories: string[];
  season: string;
  summary: string;
  coverImage: string;
  upvotes: number;
  commentCount: number;
  endorsements?: Record<string, number>;
  adaptations?: Record<string, Adaptation>;
  days: { dayNumber: number; title: string; segments: Segment[] }[];
  comments: { author: string; authorSlug: string; authorType: string; date: string; text: string; replies?: { author: string; authorSlug: string; authorType: string; date: string; text: string }[] }[];
  relatedItineraries: string[];
};

const itineraries = itinerariesData as Record<string, Itinerary>;
const contributors = contributorsData as Record<string, Contributor>;

const ENDORSEMENT_LABELS: Record<string, string> = {
  family: "Families",
  couple: "Couples",
  solo: "Solo Travellers",
  group: "Groups",
};

export function generateStaticParams() {
  return Object.keys(itineraries).map((slug) => ({ slug }));
}

export default async function ItineraryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const itinerary = itineraries[slug];
  if (!itinerary) return notFound();

  const contributor = contributors[itinerary.contributorSlug];
  if (!contributor) return notFound();

  const related = itinerary.relatedItineraries
    .map((s) => ({ slug: s, ...itineraries[s] }))
    .filter((r) => r.title);

  const endorsementEntries = itinerary.endorsements
    ? Object.entries(itinerary.endorsements).filter(([, count]) => count > 0)
    : [];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[50vh] w-full">
        <Image
          src={itinerary.coverImage}
          alt={itinerary.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 lg:px-24 pb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {itinerary.categories.map((cat) => (
              <span
                key={cat}
                className="bg-white/20 text-white text-[10px] font-semibold tracking-widest-custom uppercase px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest-custom uppercase max-w-3xl leading-tight">
            {itinerary.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <Link href="/community/" className="hover:text-teal">Community</Link>
          <span>/</span>
          <span className="text-gray-700 truncate">{itinerary.title}</span>
        </nav>
      </div>

      {/* Content */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide max-w-4xl">
          {/* Author header */}
          <div className="flex items-start gap-4 pb-8 border-b border-gray-200">
            <div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0">
              <Image src={contributor.avatar} alt={contributor.name} fill className="object-cover" unoptimized />
            </div>
            <div className="flex-1 min-w-0">
              <ContributorBadge
                name={contributor.name}
                slug={itinerary.contributorSlug}
                avatar={contributor.avatar}
                type={contributor.type}
                size="md"
              />
              <p className="text-sm text-gray-500 mt-1">{contributor.bio}</p>

              {/* Traveller details */}
              {itinerary.travellerDetails && (
                <p className="text-sm text-teal font-semibold mt-1">{itinerary.travellerDetails}</p>
              )}

              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                <span>{itinerary.duration}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{itinerary.tripDate}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{contributor.contributions} contributions</span>
              </div>

              {/* Endorsement stats */}
              {endorsementEntries.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-3">
                  {endorsementEntries.map(([type, count]) => (
                    <span key={type} className="text-xs text-gray-500">
                      <strong className="text-copper">{count}</strong> {ENDORSEMENT_LABELS[type] || type}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="shrink-0">
              <UpvoteButton count={itinerary.upvotes} />
            </div>
          </div>

          {/* Summary */}
          <p className="text-body text-lg leading-relaxed mt-8 mb-12">{itinerary.summary}</p>

          {/* Day breakdown */}
          <ItineraryDayBreakdown days={itinerary.days} />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-200">
            <button className="border border-teal rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest-custom uppercase text-teal hover:bg-teal hover:text-white transition-colors cursor-not-allowed opacity-60">
              Save This Itinerary
            </button>
            {itinerary.adaptations && Object.keys(itinerary.adaptations).length > 0 && (
              <AdaptItinerary itinerary={itinerary} />
            )}
          </div>

          {/* Comments */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <CommentSection comments={itinerary.comments} />
          </div>
        </div>
      </section>

      {/* Related itineraries */}
      {related.length > 0 && (
        <section className="bg-cream px-8 md:px-20 lg:px-24 py-16">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-teal tracking-widest-custom uppercase mb-8">
              Related Itineraries
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.slice(0, 3).map((r) => {
                const c = contributors[r.contributorSlug];
                if (!c) return null;
                return (
                  <ItineraryCard
                    key={r.slug}
                    slug={r.slug}
                    title={r.title}
                    summary={r.summary}
                    coverImage={r.coverImage}
                    duration={r.duration}
                    tripDate={r.tripDate}
                    categories={r.categories}
                    upvotes={r.upvotes}
                    commentCount={r.commentCount}
                    contributor={{ ...c, slug: r.contributorSlug }}
                    travellerType={r.travellerType}
                    endorsements={r.endorsements}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
