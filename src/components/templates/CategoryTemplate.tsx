import Image from "next/image";
import Link from "next/link";
import listings from "@/data/listings.json";
import CommunityContentStrip from "@/components/community/CommunityContentStrip";

interface CategoryData {
  title: string;
  description: string;
  heroImage: string;
  subcategories?: string[];
  listings?: string[];
}

const listingsData = listings as Record<string, {
  id: string;
  title: string;
  slug: string;
  type: string;
  heroImage: string;
  shortDescription: string;
  details: Record<string, string>;
}>;

export default function CategoryTemplate({ category, breadcrumbs }: { category: CategoryData; breadcrumbs: { label: string; href: string }[] }) {
  const categoryListings = (category.listings || [])
    .map((slug) => listingsData[slug])
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] w-full">
        <Image
          src={category.heroImage}
          alt={category.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 lg:px-24 pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest-custom uppercase max-w-3xl">
            {category.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span>/</span>
              <Link href={crumb.href} className="hover:text-teal">{crumb.label}</Link>
            </span>
          ))}
        </nav>
      </div>

      {/* Intro */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide">
          <p className="text-body text-lg leading-relaxed max-w-4xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Listing cards grid */}
      {categoryListings.length > 0 && (
        <section className="bg-white px-8 md:px-20 lg:px-24 pb-20">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryListings.map((listing) => (
                <Link
                  key={listing.slug}
                  href={`/listing/${listing.slug}/${listing.id}/`}
                  className="group rounded-2xl overflow-hidden bg-cream hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-[220px]">
                    <Image
                      src={listing.heroImage}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10" />
                    <button className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold tracking-widest-custom uppercase text-copper">
                      {listing.type}
                    </span>
                    <h3 className="text-lg font-bold text-teal mt-1 group-hover:text-teal-light transition-colors">
                      {listing.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
                      {listing.shortDescription}
                    </p>
                    <span className="inline-block mt-4 border border-gray-300 rounded-full px-6 py-2 text-xs font-semibold tracking-widest-custom uppercase text-gray-600 group-hover:bg-teal group-hover:text-white group-hover:border-teal transition-colors">
                      Read More
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {categoryListings.length === 0 && (
        <section className="bg-white px-8 md:px-20 lg:px-24 pb-20">
          <div className="container-wide text-center py-16">
            <p className="text-gray-400 text-lg">
              Listings coming soon. Check back for updates.
            </p>
          </div>
        </section>
      )}

      {/* Community content strip */}
      <CommunityContentStrip
        category={category.title.split(" ")[0].toLowerCase()}
        heading={`What Locals Are Saying About ${category.title.replace(/in Queenstown/i, "").trim()}`}
      />
    </>
  );
}
