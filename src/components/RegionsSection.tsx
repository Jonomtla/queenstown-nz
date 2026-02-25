"use client";
import { useState } from "react";

const REGIONS = [
  {
    name: "Queenstown",
    description:
      "Queenstown is the lively centre of the southern lakes region of New Zealand, nestled on the shores of Lake Wakatipu and at the base of the Southern Alps. World-class restaurants, cafes and shopping are surrounded by two ski areas, mountain biking trails, epic hikes and much more. Encompassing Arthurs Point and Frankton, Queenstown is your perfect home while exploring our stunning region.",
  },
  {
    name: "Arrowtown",
    description:
      "A charming former gold-mining town just 20 minutes from Queenstown. Known for its historic Chinese settlement, boutique shopping, excellent restaurants, and spectacular autumn colours that draw visitors from around the world.",
  },
  {
    name: "Gibbston",
    description:
      "The heart of Central Otago's wine country, Gibbston Valley is home to world-renowned Pinot Noir vineyards. Take a wine trail tour, enjoy cellar door tastings, and discover why this region produces some of New Zealand's finest wines.",
  },
  {
    name: "Glenorchy",
    description:
      "A gateway to adventure and Middle-earth magic, Glenorchy sits at the head of Lake Wakatipu surrounded by ancient beech forests and towering peaks. It's the starting point for iconic multi-day hikes including the Routeburn Track.",
  },
  {
    name: "Kingston",
    description:
      "A quaint lakeside village at the southern end of Lake Wakatipu, Kingston offers a peaceful escape with heritage railway experiences and stunning lake views. A perfect day trip from Queenstown.",
  },
];

export default function RegionsSection() {
  const [activeRegion, setActiveRegion] = useState("Queenstown");
  const region = REGIONS.find((r) => r.name === activeRegion)!;

  return (
    <section className="bg-cream py-20 px-8 md:px-20 lg:px-24">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-teal tracking-widest-custom uppercase leading-tight">
              Surrounding Regions
            </h2>

            {/* Region tabs */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-8">
              {REGIONS.map((r, i) => (
                <span key={r.name} className="flex items-center">
                  <button
                    onClick={() => setActiveRegion(r.name)}
                    className={`font-bold tracking-widest-custom uppercase text-sm transition-colors ${
                      activeRegion === r.name
                        ? "text-copper"
                        : "text-teal hover:text-copper"
                    }`}
                  >
                    {r.name}
                  </button>
                  {i < REGIONS.length - 1 && (
                    <span className="text-gray-300 mx-3">|</span>
                  )}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-teal uppercase tracking-wider">
                Explore {region.name}
              </h3>
              <p className="text-body mt-4 leading-relaxed">
                {region.description}
              </p>
            </div>
          </div>

          {/* Right map placeholder */}
          <div className="bg-teal/5 rounded-2xl h-[400px] flex items-center justify-center relative overflow-hidden">
            {/* Stylised map SVG */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full p-8"
              fill="none"
            >
              {/* Lake shape */}
              <path
                d="M200 50 C230 80, 240 150, 220 250 C210 300, 190 350, 180 380 C170 350, 160 300, 170 250 C180 150, 170 80, 200 50Z"
                fill="#004157"
                opacity="0.15"
              />
              {/* Queenstown marker */}
              <circle cx="210" cy="260" r="8" fill="#c67a3c" />
              <text x="140" y="265" fill="#004157" fontSize="11" fontWeight="bold">
                QUEENSTOWN
              </text>
              {/* Glenorchy */}
              <circle cx="195" cy="130" r="5" fill="#004157" opacity="0.5" />
              <text x="210" y="135" fill="#004157" fontSize="9" opacity="0.7">
                Glenorchy
              </text>
              {/* Arrowtown */}
              <circle cx="310" cy="210" r="5" fill="#004157" opacity="0.5" />
              <text x="280" y="200" fill="#004157" fontSize="9" opacity="0.7">
                Arrowtown
              </text>
              {/* Gibbston */}
              <circle cx="330" cy="290" r="5" fill="#004157" opacity="0.5" />
              <text x="310" y="310" fill="#004157" fontSize="9" opacity="0.7">
                Gibbston
              </text>
              {/* Kingston */}
              <circle cx="190" cy="370" r="5" fill="#004157" opacity="0.5" />
              <text x="200" y="375" fill="#004157" fontSize="9" opacity="0.7">
                Kingston
              </text>
              {/* Road lines */}
              <path
                d="M210 260 L310 210"
                stroke="#004157"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="4 4"
              />
              <path
                d="M210 260 L330 290"
                stroke="#004157"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="4 4"
              />
              <path
                d="M210 260 L195 130"
                stroke="#004157"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="4 4"
              />
              <path
                d="M210 260 L190 370"
                stroke="#004157"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
