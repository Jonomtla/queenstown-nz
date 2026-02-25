import { notFound } from "next/navigation";
import PageLayout from "@/components/templates/PageLayout";
import ListingTemplate from "@/components/templates/ListingTemplate";
import listings from "@/data/listings.json";

const listingsData = listings as Record<string, {
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
}>;

export function generateStaticParams() {
  return Object.values(listingsData).map((listing) => ({
    slug: listing.slug,
    id: listing.id,
  }));
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;

  const listing = Object.values(listingsData).find(
    (l) => l.slug === slug && l.id === id
  );

  if (!listing) return notFound();

  return (
    <PageLayout>
      <ListingTemplate listing={listing} />
    </PageLayout>
  );
}
