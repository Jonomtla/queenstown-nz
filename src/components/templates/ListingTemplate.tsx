import Image from "next/image";
import Link from "next/link";
import listings from "@/data/listings.json";

interface ListingData {
  id: string;
  title: string;
  slug: string;
  type: string;
  category: string;
  heroImage: string;
  images: string[];
  shortDescription: string;
  description: string;
  details: Record<string, string>;
  address: string;
  phone: string | null;
  website: string | null;
  hours: string;
  relatedListings: string[];
}

const listingsData = listings as Record<string, ListingData>;

export default function ListingTemplate({ listing }: { listing: ListingData }) {
  const related = listing.relatedListings
    .map((slug) => listingsData[slug])
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] w-full">
        <Image
          src={listing.heroImage}
          alt={listing.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <span className="text-gray-700">{listing.title}</span>
        </nav>
      </div>

      {/* Content */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Main content */}
          <div>
            <span className="inline-block bg-copper/10 text-copper text-xs font-semibold tracking-widest-custom uppercase px-4 py-1.5 rounded-full">
              {listing.type}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-teal mt-4 tracking-widest-custom uppercase leading-tight">
              {listing.title}
            </h1>
            <div className="mt-8 text-gray-600 leading-relaxed space-y-4">
              {listing.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Key details */}
            {Object.keys(listing.details).length > 0 && (
              <div className="mt-10 bg-cream rounded-xl p-6">
                <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-4">
                  Key Details
                </h3>
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(listing.details).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-xs font-semibold tracking-widest-custom uppercase text-gray-400">
                        {key.replace(/_/g, " ")}
                      </dt>
                      <dd className="text-gray-700 mt-1">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="bg-cream rounded-xl p-6 space-y-5">
              <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">
                Contact & Info
              </h3>

              {listing.address && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-copper shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm">{listing.address}</span>
                </div>
              )}

              {listing.phone && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-copper shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${listing.phone}`} className="text-teal text-sm hover:underline">
                    {listing.phone}
                  </a>
                </div>
              )}

              {listing.website && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-copper shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-teal text-sm hover:underline">
                    Visit Website
                  </a>
                </div>
              )}

              {listing.hours && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-copper shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm">{listing.hours}</span>
                </div>
              )}
            </div>

            {/* Map placeholder */}
            <div className="mt-6 bg-gray-200 rounded-xl h-[200px] flex items-center justify-center">
              <span className="text-gray-400 text-sm">Map</span>
            </div>
          </aside>
        </div>
      </section>

      {/* Related listings */}
      {related.length > 0 && (
        <section className="bg-cream px-8 md:px-20 lg:px-24 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-teal tracking-widest-custom uppercase mb-8">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/listing/${item.slug}/${item.id}/`}
                  className="group rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-[200px]">
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold tracking-widest-custom uppercase text-copper">
                      {item.type}
                    </span>
                    <h3 className="text-lg font-bold text-teal mt-1 group-hover:text-teal-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
