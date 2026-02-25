"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Place {
  name: string;
  listingSlug?: string;
  href?: string;
  lat?: number;
  lng?: number;
}

interface RainyAlternative {
  title: string;
  description: string;
  places: Place[];
}

interface Segment {
  timeOfDay: string;
  title: string;
  description: string;
  places: Place[];
  image?: string;
  localTip?: string;
  ageRange?: string;
  setting?: "indoor" | "outdoor" | "both";
  rainyAlternative?: RainyAlternative;
}

interface Day {
  dayNumber: number;
  title: string;
  segments: Segment[];
}

const TIME_LABELS: Record<string, { label: string; color: string }> = {
  morning: { label: "Morning", color: "bg-copper/10 text-copper" },
  afternoon: { label: "Afternoon", color: "bg-teal/10 text-teal" },
  evening: { label: "Evening", color: "bg-gray-800/10 text-gray-700" },
};

const AGE_LABELS: Record<string, string> = {
  "all-ages": "All Ages",
  "ages-3+": "Ages 3+",
  "ages-5+": "Ages 5+",
  "ages-8+": "Ages 8+",
  "teens+": "Teens+",
  "adults-only": "Adults Only",
};

const SETTING_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  outdoor: {
    label: "Outdoor",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zM12 3v1m0 16v1m9-9h-1M4 12H3",
    color: "bg-blue-50 text-blue-600",
  },
  indoor: {
    label: "Indoor",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    color: "bg-purple-50 text-purple-600",
  },
  both: {
    label: "Indoor/Outdoor",
    icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
    color: "bg-gray-100 text-gray-600",
  },
};

function PlaceLink({ place }: { place: Place }) {
  const href = place.listingSlug
    ? `/listing/${place.listingSlug}/`
    : place.href;

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest-custom uppercase text-teal hover:text-teal-light transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {place.name}
      </Link>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest-custom uppercase text-gray-500">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {place.name}
    </span>
  );
}

function SegmentItem({ segment }: { segment: Segment }) {
  const [rainyOpen, setRainyOpen] = useState(false);
  const time = TIME_LABELS[segment.timeOfDay] || { label: segment.timeOfDay, color: "bg-gray-100 text-gray-600" };
  const settingCfg = segment.setting ? SETTING_CONFIG[segment.setting] : null;

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-white border-2 border-gray-300" />

      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className={`inline-block text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-0.5 rounded-full ${time.color}`}>
          {time.label}
        </span>
        {settingCfg && (
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-0.5 rounded-full ${settingCfg.color}`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={settingCfg.icon} />
            </svg>
            {settingCfg.label}
          </span>
        )}
        {segment.ageRange && (
          <span className="inline-block text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-0.5 rounded-full bg-teal/10 text-teal">
            {AGE_LABELS[segment.ageRange] || segment.ageRange}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-body">{segment.title}</h3>
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{segment.description}</p>

      {segment.image && (
        <div className="relative h-[200px] md:h-[280px] rounded-xl overflow-hidden mt-4">
          <Image
            src={segment.image}
            alt={segment.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      {segment.places.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {segment.places.map((place) => (
            <PlaceLink key={place.name} place={place} />
          ))}
        </div>
      )}

      {segment.localTip && (
        <div className="mt-4 bg-copper/5 border border-copper/20 rounded-xl p-4">
          <p className="text-xs font-semibold tracking-widest-custom uppercase text-copper mb-1">
            Local Tip
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{segment.localTip}</p>
        </div>
      )}

      {/* Rainy day alternative */}
      {segment.rainyAlternative && (
        <div className="mt-3">
          <button
            onClick={() => setRainyOpen(!rainyOpen)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest-custom uppercase text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Rainy Day Alternative
            <svg className={`w-3 h-3 transition-transform ${rainyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {rainyOpen && (
            <div className="mt-2 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h4 className="text-sm font-bold text-blue-800">{segment.rainyAlternative.title}</h4>
              <p className="text-sm text-blue-700 mt-1 leading-relaxed">{segment.rainyAlternative.description}</p>
              {segment.rainyAlternative.places.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {segment.rainyAlternative.places.map((place) => (
                    <PlaceLink key={place.name} place={place} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ItineraryDayBreakdown({ days }: { days: Day[] }) {
  return (
    <div className="space-y-12">
      {days.map((day) => (
        <div key={day.dayNumber}>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold shrink-0">
              {day.dayNumber}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-teal tracking-widest-custom uppercase">
              {day.title}
            </h2>
          </div>

          <div className="ml-5 border-l-2 border-gray-200 pl-8 space-y-8">
            {day.segments.map((segment, i) => (
              <SegmentItem key={i} segment={segment} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
