import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import GolfSeasonality from "@/components/hubs/GolfSeasonality";
import GolfCourseCard from "@/components/hubs/GolfCourseCard";
import GolfCommunity from "@/components/hubs/GolfCommunity";
import GolfStayLonger from "@/components/hubs/GolfStayLonger";
import hubData from "@/data/hub-golf.json";

export const metadata = {
  title: "Golf in Queenstown — Courses, Tips & Seasonal Guide | Queenstown NZ",
  description: "World-class golf courses framed by mountains and lakes. Course directory, seasonal conditions, local tips, and community recommendations.",
};

export default function GolfHubPage() {
  const { hero, courses, seasonality, communityTips, itineraryIdeas, stayLonger } = hubData;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] w-full">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 lg:px-24 pb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 text-white text-[10px] font-semibold tracking-widest-custom uppercase px-3 py-1 rounded-full backdrop-blur-sm">
              Hub
            </span>
            <span className="bg-green-500/80 text-white text-[10px] font-semibold tracking-widest-custom uppercase px-3 py-1 rounded-full backdrop-blur-sm">
              Golf
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest-custom uppercase max-w-3xl leading-tight">
            {hero.title}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            {hero.subtitle}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { label: "Courses", value: hero.stats.courses },
              { label: "Holes", value: hero.stats.holes },
              { label: "Season", value: hero.stats.season },
              { label: "Best Month", value: hero.stats.bestMonth },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-white text-lg md:text-xl font-bold">{stat.value}</p>
                <p className="text-white/60 text-[10px] font-semibold tracking-widest-custom uppercase">{stat.label}</p>
              </div>
            ))}
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
          <span className="text-gray-700">Golf Hub</span>
        </nav>
      </div>

      {/* Main content grid */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Left column — courses + community */}
          <div>
            {/* Seasonal conditions — mobile only (sidebar has it on desktop) */}
            <div className="lg:hidden mb-8">
              <GolfSeasonality seasonality={seasonality} />
            </div>

            {/* Course directory */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-teal tracking-widest-custom uppercase">
                    Course Directory
                  </h2>
                  <p className="text-xs text-gray-500">{courses.length} courses in the Queenstown region</p>
                </div>
              </div>

              <div className="space-y-6">
                {courses.map((course) => (
                  <GolfCourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>

            {/* Community itinerary ideas */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-teal tracking-widest-custom uppercase">
                    Golf Itineraries
                  </h2>
                  <p className="text-xs text-gray-500">Suggested trip plans from the community</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {itineraryIdeas.map((idea, i) => (
                  <div key={i} className="bg-cream rounded-xl p-5 hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-bold text-body mb-3">{idea.title}</h3>
                    <div className="space-y-2 mb-3">
                      {idea.days.map((day, d) => (
                        <div key={d} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-teal text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {d + 1}
                          </span>
                          <p className="text-xs text-gray-600 leading-relaxed">{day}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                      <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        Best: {idea.bestSeason}
                      </span>
                    </div>
                    <p className="text-[10px] text-teal font-semibold mt-2">{idea.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community tips */}
            <GolfCommunity tips={communityTips} />
          </div>

          {/* Right sidebar */}
          <div className="hidden lg:block space-y-8">
            {/* Seasonal conditions */}
            <GolfSeasonality seasonality={seasonality} />

            {/* Stay longer nudge */}
            <GolfStayLonger data={stayLonger} courseCount={courses.length} />

            {/* Quick links */}
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/things-to-do/golf/golf-courses/"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal transition-colors py-1"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  All Golf Courses
                </Link>
                <Link
                  href="/community/category/golf/"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal transition-colors py-1"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  Golf Community Posts
                </Link>
                <Link
                  href="/community/"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal transition-colors py-1"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  All Community Content
                </Link>
              </div>
            </div>

            {/* Other hubs teaser */}
            <div className="bg-cream rounded-xl p-6">
              <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-3">
                More Hubs
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Deep-dive guides for every interest.
              </p>
              <div className="space-y-2">
                {["Snow & Ski", "Mountain Biking", "Wine & Food", "Astro Tourism"].map((hub) => (
                  <div key={hub} className="flex items-center gap-2 text-sm text-gray-400 py-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {hub}
                    <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full ml-auto">Coming soon</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
