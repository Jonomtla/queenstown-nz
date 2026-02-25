import Image from "next/image";
import Link from "next/link";
import stories from "@/data/stories.json";

interface StoryData {
  title: string;
  slug: string;
  heroImage: string;
  author: string;
  readTime: string;
  excerpt: string;
  body: string;
  relatedStories: string[];
}

const storiesData = stories as Record<string, StoryData>;

export default function StoryTemplate({ story }: { story: StoryData }) {
  const related = story.relatedStories
    .map((slug) => storiesData[slug])
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] w-full">
        <Image
          src={story.heroImage}
          alt={story.title}
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
          <Link href="/stories/" className="hover:text-teal">Stories</Link>
          <span>/</span>
          <span className="text-gray-700 truncate">{story.title}</span>
        </nav>
      </div>

      {/* Article */}
      <article className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold italic font-serif text-gray-800 leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
            <span>{story.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {story.readTime}
            </span>
          </div>

          {/* Share buttons */}
          <div className="flex items-center gap-3 mt-6 pb-8 border-b border-gray-200">
            <span className="text-xs font-semibold tracking-widest-custom uppercase text-gray-400">Share</span>
            {["facebook", "twitter", "email"].map((platform) => (
              <button
                key={platform}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal hover:text-white text-gray-500 transition-colors"
              >
                <span className="text-xs font-bold uppercase">{platform[0]}</span>
              </button>
            ))}
          </div>

          {/* Body */}
          <div
            className="mt-8 prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-teal prose-headings:tracking-widest-custom prose-headings:uppercase prose-headings:text-xl prose-p:text-gray-600 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: story.body }}
          />
        </div>
      </article>

      {/* Related stories */}
      {related.length > 0 && (
        <section className="bg-cream px-8 md:px-20 lg:px-24 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-teal tracking-widest-custom uppercase mb-8">
              More Stories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/stories/post/${item.slug}/`}
                  className="group rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-[220px]">
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold italic font-serif text-gray-800 leading-snug group-hover:text-teal transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">{item.readTime}</p>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
                      {item.excerpt}
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
