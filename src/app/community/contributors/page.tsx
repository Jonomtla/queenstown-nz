import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import contributorsData from "@/data/community-contributors.json";

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

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  local: { label: "Local", color: "bg-teal/10 text-teal" },
  visitor: { label: "Visitor", color: "bg-gray-100 text-gray-500" },
  creator: { label: "Creator", color: "bg-copper/10 text-copper" },
};

const sorted = Object.entries(contributors).sort(([, a], [, b]) => b.upvotesReceived - a.upvotesReceived);

export default function ContributorsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-teal px-8 md:px-20 lg:px-24 pt-32 pb-12">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest-custom uppercase">
            Community Contributors
          </h1>
          <p className="text-white/70 mt-3 max-w-2xl">
            The locals, visitors, and creators who share their Queenstown knowledge to help you plan the perfect trip.
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
          <span className="text-gray-700">Contributors</span>
        </nav>
      </div>

      {/* Grid */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map(([slug, contrib], index) => {
            const typeStyle = TYPE_LABELS[contrib.type] || TYPE_LABELS.visitor;
            return (
              <Link
                key={slug}
                href={`/community/contributors/${slug}/`}
                className="group bg-cream rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0">
                    <Image src={contrib.avatar} alt={contrib.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-700 group-hover:text-teal transition-colors truncate">
                        {index === 0 && <span className="mr-1" title="Top contributor">🏆</span>}
                        {index === 1 && <span className="mr-1" title="Runner up">🥈</span>}
                        {index === 2 && <span className="mr-1" title="Third place">🥉</span>}
                        {contrib.name}
                      </h2>
                    </div>
                    <span className={`inline-block text-[10px] font-semibold tracking-widest-custom uppercase px-2 py-0.5 rounded-full mt-0.5 ${typeStyle.color}`}>
                      {typeStyle.label}
                    </span>
                  </div>
                </div>

                {contrib.travellerProfile && (
                  <p className="text-sm text-gray-500 italic mb-3">{contrib.travellerProfile}</p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span><strong className="text-teal">{contrib.contributions}</strong> contributions</span>
                  <span><strong className="text-copper">{contrib.upvotesReceived}</strong> upvotes</span>
                </div>

                {contrib.location && (
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {contrib.location}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
