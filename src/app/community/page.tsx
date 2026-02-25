import PageLayout from "@/components/templates/PageLayout";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityFeed from "@/components/community/CommunityFeed";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <PageLayout>
      <CommunityHero
        title="Community"
        subtitle="Find trips from people like you — families, couples, solo adventurers. Real itineraries, honest tips, and recommendations you won't find in a guidebook."
      />

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <span className="text-gray-700">Community</span>
        </nav>
      </div>

      {/* Feed + Sidebar */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide grid lg:grid-cols-[1fr_340px] gap-12">
          <CommunityFeed />
          <div className="hidden lg:block">
            <CommunitySidebar />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
