"use client";
import { useRef } from "react";
import Image from "next/image";

const TRIPS = [
  {
    title: "Soak Up Summer in Queenstown - a 6-day Travel Itinerary",
    readTime: "9 min read",
    href: "/stories/post/6-day-queenstown-slow-travel-itinerary/",
    excerpt:
      "Take the time to immerse yourself in Queenstown's natural beauty, connect with the locals, and...",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop",
    alt: "Hikers crossing suspension bridge on Queenstown Trail",
  },
  {
    title: "A Local's Guide to the Queenstown Markets",
    readTime: "7 min read",
    href: "/stories/post/a-locals-guide-to-the-queenstown-markets/",
    excerpt:
      "From artisan food to handmade crafts, discover Queenstown's vibrant market scene through the eyes of a local.",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
    alt: "Queenstown markets",
  },
  {
    title: "10 Things To Do in Queenstown This Summer",
    readTime: "14 min read",
    href: "/stories/post/10-things-to-do-in-summer/",
    excerpt:
      "Long days spent enjoying summer in Queenstown... ten of the best activities for your visit.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Summer activities by the lake in Queenstown",
  },
];

export default function TripIdeas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -420 : 420,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-20 px-8 md:px-20 lg:px-24">
      <div className="container-wide">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Left text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-teal tracking-widest-custom uppercase leading-tight">
              Explore Trip Ideas
            </h2>
            <p className="text-body mt-4 leading-relaxed">
              Explore our collection of unique experiences and itineraries to
              make the most of your time in Queenstown.
            </p>
            <a
              href="/plan/itineraries/"
              className="inline-block mt-6 border border-gray-400 rounded-full px-8 py-3 text-sm font-semibold tracking-widest-custom uppercase text-gray-600 hover:bg-gray-50 transition-colors"
            >
              See All
            </a>
          </div>

          {/* Cards carousel */}
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {TRIPS.map((trip) => (
                <a
                  key={trip.title}
                  href={trip.href}
                  className="shrink-0 w-[380px] group cursor-pointer"
                >
                  <div className="relative h-[280px] rounded-xl overflow-hidden mb-4">
                    <Image
                      src={trip.image}
                      alt={trip.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 italic font-serif leading-snug group-hover:text-teal transition-colors">
                    {trip.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {trip.readTime}
                  </p>
                  <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                    {trip.excerpt}
                  </p>
                  <span className="inline-block mt-4 border border-gray-400 rounded-full px-6 py-2 text-xs font-semibold tracking-widest-custom uppercase text-gray-600 group-hover:bg-teal group-hover:text-white group-hover:border-teal transition-colors">
                    Read More
                  </span>
                </a>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
