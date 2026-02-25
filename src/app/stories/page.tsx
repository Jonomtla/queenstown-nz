import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import stories from "@/data/stories.json";
import plans from "@/data/plans.json";

const storiesData = stories as Record<string, {
  title: string;
  slug: string;
  heroImage: string;
  author: string;
  readTime: string;
  excerpt: string;
}>;

const plansData = plans as Record<string, { title: string; description: string; heroImage: string }>;
const storiesIndex = plansData["stories"];
const allStories = Object.values(storiesData);

export default function StoriesIndexPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[50vh] w-full">
        <Image
          src={storiesIndex.heroImage}
          alt={storiesIndex.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 lg:px-24 pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest-custom uppercase max-w-3xl">
            {storiesIndex.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <span className="text-gray-700">Stories</span>
        </nav>
      </div>

      {/* Intro */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            {storiesIndex.description}
          </p>
        </div>
      </section>

      {/* Stories grid */}
      <section className="bg-white px-8 md:px-20 lg:px-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allStories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/post/${story.slug}/`}
                className="group rounded-2xl overflow-hidden bg-cream hover:shadow-lg transition-shadow"
              >
                <div className="relative h-[240px]">
                  <Image
                    src={story.heroImage}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold italic font-serif text-gray-800 leading-snug group-hover:text-teal transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {story.readTime}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>
                  <span className="inline-block mt-4 bg-teal text-white font-semibold tracking-widest-custom uppercase text-xs px-6 py-2.5 rounded-full group-hover:bg-teal-dark transition-colors">
                    Read More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
