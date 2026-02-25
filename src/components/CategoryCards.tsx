"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const TABS = ["Things To Do", "Eat & Drink", "Accommodation"] as const;

const CATEGORIES = {
  "Things To Do": [
    {
      title: "Adventure",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1390,y_798/v1/clients/queenstownnz/Paradise_Ziplines_Please_use_SouthernWay_where_possible_5704037b-c6b5-47f4-9f70-bfe79ab644bf.jpg",
      alt: "Person ziplining with snow-covered mountain",
    },
    {
      title: "Culture & Heritage",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_2019,y_1539/v1/clients/queenstownnz/Picnic_by_historic_cottage_in_Macetown_Queenstown_196e80fd-60ba-4f36-96c0-590bd578cde9.jpg",
      alt: "Picnic by historic cottage in Macetown",
    },
    {
      title: "Biking",
      image:
        "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600&h=700&fit=crop",
      alt: "Mountain bikers on Queenstown trails",
    },
    {
      title: "Walking & Hiking",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=700&fit=crop",
      alt: "Walkers on lakeside trail with mountains",
    },
    {
      title: "Family Fun",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1210,y_880/v1/clients/queenstownnz/Family_at_Queenstown_Bay_Playground_1__eef16657-1ae9-42c6-acbf-38456b437a10.jpg",
      alt: "Family playing on a playground",
    },
    {
      title: "Sightseeing",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_3212,y_1889/v1/clients/queenstownnz/Spirit_of_Queenstown_Scenic_Cruise_Southern_Discoveries_026754f4-87da-423e-a630-2a14f4b0c1cd.jpg",
      alt: "Spirit of Queenstown Scenic Cruise",
    },
  ],
  "Eat & Drink": [
    {
      title: "Restaurants",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1210,y_880/v1/clients/queenstownnz/Family_at_Queenstown_Bay_Playground_1__eef16657-1ae9-42c6-acbf-38456b437a10.jpg",
      alt: "Restaurant dining in Queenstown",
    },
    {
      title: "Cafes",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1430,y_1269/v1/clients/queenstownnz-redesign/Arrowtown_75ffc999-cb6e-4112-9f47-a1.jpg",
      alt: "Cafe in Arrowtown",
    },
    {
      title: "Wineries & Breweries",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_2019,y_1539/v1/clients/queenstownnz/Picnic_by_historic_cottage_in_Macetown_Queenstown_196e80fd-60ba-4f36-96c0-590bd578cde9.jpg",
      alt: "Wine tasting in Gibbston Valley",
    },
    {
      title: "Pubs & Bars",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_3212,y_1889/v1/clients/queenstownnz/Spirit_of_Queenstown_Scenic_Cruise_Southern_Discoveries_026754f4-87da-423e-a630-2a14f4b0c1cd.jpg",
      alt: "Queenstown nightlife",
    },
  ],
  Accommodation: [
    {
      title: "Hotels",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_3439,y_4457/v1/clients/queenstownnz/Queenstown_Golf_Club_8__4de95f71-8986-4f98-bd7d-30d79056c6db.jpg",
      alt: "Luxury hotel in Queenstown",
    },
    {
      title: "Holiday Rentals",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1390,y_798/v1/clients/queenstownnz/Paradise_Ziplines_Please_use_SouthernWay_where_possible_5704037b-c6b5-47f4-9f70-bfe79ab644bf.jpg",
      alt: "Holiday rental with mountain views",
    },
    {
      title: "Lodges",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_2019,y_1539/v1/clients/queenstownnz/Picnic_by_historic_cottage_in_Macetown_Queenstown_196e80fd-60ba-4f36-96c0-590bd578cde9.jpg",
      alt: "Luxury lodge accommodation",
    },
    {
      title: "Backpackers",
      image:
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1210,y_880/v1/clients/queenstownnz/Family_at_Queenstown_Bay_Playground_1__eef16657-1ae9-42c6-acbf-38456b437a10.jpg",
      alt: "Budget accommodation Queenstown",
    },
  ],
};

export default function CategoryCards() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("Things To Do");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  const cards = CATEGORIES[activeTab];

  return (
    <section className="bg-white pb-16 px-8 md:px-20 lg:px-24">
      <div className="container-wide">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold tracking-widest-custom uppercase transition-colors ${
                activeTab === tab
                  ? "text-teal border-b-3 border-copper"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
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
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {cards.map((card) => (
              <a
                key={card.title}
                href="#"
                className="shrink-0 w-[280px] h-[350px] rounded-2xl overflow-hidden relative group cursor-pointer"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-lg font-bold tracking-widest-custom uppercase text-center px-4">
                    {card.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
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
