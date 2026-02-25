import { notFound } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityFeed from "@/components/community/CommunityFeed";
import CommunitySidebar from "@/components/community/CommunitySidebar";

const VALID_TAGS: Record<string, { title: string; subtitle: string; filterKey: "category" | "season" }> = {
  winter: {
    title: "Winter in Queenstown",
    subtitle: "Ski fields, cosy pubs, and everything you need for the ultimate Queenstown winter.",
    filterKey: "season",
  },
  summer: {
    title: "Summer in Queenstown",
    subtitle: "Long days, lake swims, and endless outdoor adventures. Summer at its best.",
    filterKey: "season",
  },
  autumn: {
    title: "Autumn in Queenstown",
    subtitle: "Golden colours, quiet trails, and the best wine tasting season.",
    filterKey: "season",
  },
  spring: {
    title: "Spring in Queenstown",
    subtitle: "Wildflowers, fresh powder on the peaks, and shoulder-season deals.",
    filterKey: "season",
  },
  skiing: {
    title: "Skiing & Snowboarding",
    subtitle: "Local intel on the best runs, gear tips, and après spots from people who ski here every week.",
    filterKey: "category",
  },
  family: {
    title: "Family Adventures",
    subtitle: "Tested and approved by real parents — itineraries and tips that keep the whole family happy.",
    filterKey: "category",
  },
  dining: {
    title: "Eating & Drinking",
    subtitle: "Where locals actually eat. Skip the tourist traps and find the real food scene.",
    filterKey: "category",
  },
  adventure: {
    title: "Adventure Activities",
    subtitle: "Bungy, jet boats, skydiving — insider tips for getting the most out of Queenstown's adrenaline scene.",
    filterKey: "category",
  },
  hiking: {
    title: "Hiking & Walking",
    subtitle: "From gentle lakeside strolls to serious alpine missions — routes and tips from people who walk them regularly.",
    filterKey: "category",
  },
  photography: {
    title: "Photography Spots",
    subtitle: "Where to be, when to be there. A photographer's guide to capturing Queenstown at its best.",
    filterKey: "category",
  },
  budget: {
    title: "Budget Tips",
    subtitle: "Queenstown doesn't have to break the bank. Free activities, cheap eats, and smart savings.",
    filterKey: "category",
  },
  outdoor: {
    title: "Outdoor Activities",
    subtitle: "Everything from biking to kayaking — outdoor adventures beyond the big-ticket activities.",
    filterKey: "category",
  },
  culture: {
    title: "Culture & History",
    subtitle: "The stories behind the mountains, the lakes, and the people who call this place home.",
    filterKey: "category",
  },
};

export function generateStaticParams() {
  return Object.keys(VALID_TAGS).map((tag) => ({ tag }));
}

export default async function CategoryPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const config = VALID_TAGS[tag];
  if (!config) return notFound();

  const feedProps = config.filterKey === "season"
    ? { initialSeason: tag }
    : { initialCategory: tag };

  return (
    <PageLayout>
      <CommunityHero title={config.title} subtitle={config.subtitle} />

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <Link href="/community/" className="hover:text-teal">Community</Link>
          <span>/</span>
          <span className="text-gray-700">{config.title}</span>
        </nav>
      </div>

      {/* Feed + Sidebar */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide grid lg:grid-cols-[1fr_340px] gap-12">
          <CommunityFeed {...feedProps} />
          <div className="hidden lg:block">
            <CommunitySidebar />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
