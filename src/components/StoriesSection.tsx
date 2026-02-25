"use client";
import { useRef } from "react";
import Image from "next/image";

const FEATURED_STORY = {
  title: "How Queenstown is Changing Tourism for Good",
  readTime: "14 Min Read",
  excerpt:
    "Get the lowdown on Queenstown's journey to become a carbon zero regenerative destination by 2030 and discover how we're changing tourism for good.",
  image:
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_2019,y_1539/v1/clients/queenstownnz/Picnic_by_historic_cottage_in_Macetown_Queenstown_196e80fd-60ba-4f36-96c0-590bd578cde9.jpg",
  alt: "Panoramic view of Queenstown valley",
};

const STORIES = [
  {
    title: "Headwaters Eco Lodge: Regeneration in action",
    readTime: "5 Min Read",
    excerpt:
      "Earlier this month, Headwaters Glenorchy Eco Lodge claimed both the Excellence in Sustainability award and the overall Supreme Award at the 2025 Queenstown...",
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_3439,y_4457/v1/clients/queenstownnz/Queenstown_Golf_Club_8__4de95f71-8986-4f98-bd7d-30d79056c6db.jpg",
    alt: "Headwaters Eco Lodge aerial view",
  },
  {
    title: "Coronet Peak's Bringing Christmas Cheer to the Community",
    readTime: "3 Min Read",
    excerpt:
      "A creative approach to conservation is bringing festive cheer to Queenstown, one wilding pine at a time.",
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1390,y_798/v1/clients/queenstownnz/Paradise_Ziplines_Please_use_SouthernWay_where_possible_5704037b-c6b5-47f4-9f70-bfe79ab644bf.jpg",
    alt: "Coronet Peak conservation work",
  },
  {
    title: "Catch a Fish leads a quiet revolution on the lakes",
    readTime: "5 Min Read",
    excerpt:
      "Kiwi-Dutch couple Olly Garland and Sanne Keurentjes launched Catch a Fish in March 2025, with sustainability front of mind. Their fishing charter is customised...",
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_3212,y_1889/v1/clients/queenstownnz/Spirit_of_Queenstown_Scenic_Cruise_Southern_Discoveries_026754f4-87da-423e-a630-2a14f4b0c1cd.jpg",
    alt: "Fishing on Lake Wakatipu",
  },
];

export default function StoriesSection() {
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
    <section className="bg-cream py-20 px-8 md:px-20 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 uppercase tracking-widest-custom text-sm font-semibold">
          Featured
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-teal tracking-widest-custom uppercase leading-tight mt-2">
          Queenstown Stories
        </h2>

        {/* Featured story */}
        <div className="grid lg:grid-cols-2 gap-10 mt-10">
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src={FEATURED_STORY.image}
              alt={FEATURED_STORY.alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-bold italic font-serif text-gray-800 leading-snug">
              {FEATURED_STORY.title}
            </h3>
            <p className="text-gray-400 text-sm mt-3 flex items-center gap-1">
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
              {FEATURED_STORY.readTime}
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              {FEATURED_STORY.excerpt}
            </p>
            <a
              href="#"
              className="inline-block mt-6 bg-teal text-white font-semibold tracking-widest-custom uppercase text-xs px-8 py-3 rounded-full hover:bg-teal-dark transition-colors self-start"
            >
              Read More
            </a>
          </div>
        </div>

        {/* Story cards carousel */}
        <div className="relative mt-16">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/3 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50"
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
            {STORIES.map((story) => (
              <a
                key={story.title}
                href="#"
                className="shrink-0 w-[380px] group cursor-pointer"
              >
                <div className="relative h-[260px] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold italic font-serif text-gray-800 leading-snug group-hover:text-teal transition-colors">
                  {story.title}
                </h4>
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
                  {story.readTime}
                </p>
                <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                  {story.excerpt}
                </p>
                <span className="inline-block mt-4 bg-teal text-white font-semibold tracking-widest-custom uppercase text-xs px-6 py-2.5 rounded-full group-hover:bg-teal-dark transition-colors">
                  Read More
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/3 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50"
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
    </section>
  );
}
