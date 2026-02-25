import Image from "next/image";
import Link from "next/link";

interface Place {
  name: string;
  listingSlug?: string;
  href?: string;
}

interface Segment {
  timeOfDay: string;
  title: string;
  description: string;
  places: Place[];
  image?: string;
  localTip?: string;
  ageRange?: string;
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
            {day.segments.map((segment, i) => {
              const time = TIME_LABELS[segment.timeOfDay] || { label: segment.timeOfDay, color: "bg-gray-100 text-gray-600" };

              return (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-white border-2 border-gray-300" />

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-block text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-0.5 rounded-full ${time.color}`}>
                      {time.label}
                    </span>
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
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
