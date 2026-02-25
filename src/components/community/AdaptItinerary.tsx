"use client";

import { useState } from "react";

type Place = { name: string; listingSlug?: string; href?: string };

type Swap = {
  segmentTitle: string;
  replacement: {
    title: string;
    description: string;
    places: Place[];
    ageRange?: string;
  };
};

type Adaptation = {
  swaps: Swap[];
};

type Segment = {
  timeOfDay: string;
  title: string;
  description: string;
  places: Place[];
  image?: string;
  localTip?: string;
  ageRange?: string;
};

type Itinerary = {
  title: string;
  travellerType: string;
  days: { dayNumber: number; title: string; segments: Segment[] }[];
  adaptations?: Record<string, Adaptation>;
};

const ADAPTATION_OPTIONS = [
  { value: "family-young", label: "Family with Young Kids", description: "Swaps fine dining & extreme activities for family-friendly alternatives" },
  { value: "couple", label: "Couple", description: "Swaps family activities for romantic alternatives" },
  { value: "solo", label: "Solo Traveller", description: "Optimises for solo-friendly dining & experiences" },
];

const AGE_LABELS: Record<string, string> = {
  "all-ages": "All Ages",
  "ages-3+": "Ages 3+",
  "ages-5+": "Ages 5+",
  "ages-8+": "Ages 8+",
  "teens+": "Teens+",
  "adults-only": "Adults Only",
};

export default function AdaptItinerary({ itinerary }: { itinerary: Itinerary }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAdaptation, setSelectedAdaptation] = useState<string | null>(null);

  const availableAdaptations = ADAPTATION_OPTIONS.filter(
    (opt) => itinerary.adaptations?.[opt.value]
  );

  if (availableAdaptations.length === 0) return null;

  const adaptation = selectedAdaptation ? itinerary.adaptations?.[selectedAdaptation] : null;
  const swapTitles = new Set(adaptation?.swaps.map((s) => s.segmentTitle) || []);
  const swapMap = new Map(adaptation?.swaps.map((s) => [s.segmentTitle, s.replacement]) || []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="border border-gray-300 rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest-custom uppercase text-gray-600 hover:bg-teal hover:text-white hover:border-teal transition-colors"
      >
        Adapt This Itinerary
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg font-bold text-teal tracking-widest-custom uppercase">
                Adapt This Itinerary
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Step 1: Choose adaptation */}
              <p className="text-sm text-gray-600 mb-4">
                Choose how you&apos;d like to adapt &ldquo;{itinerary.title}&rdquo;:
              </p>

              <div className="grid gap-3 mb-6">
                {availableAdaptations.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedAdaptation(opt.value)}
                    className={`text-left p-4 rounded-xl border-2 transition-colors ${
                      selectedAdaptation === opt.value
                        ? "border-teal bg-teal/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="text-sm font-bold text-body">{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                  </button>
                ))}
              </div>

              {/* Step 2: Show adapted preview */}
              {adaptation && (
                <div>
                  <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-4">
                    Adapted Preview
                  </h3>
                  <div className="space-y-6">
                    {itinerary.days.map((day) => (
                      <div key={day.dayNumber}>
                        <p className="text-xs font-bold tracking-widest-custom uppercase text-gray-400 mb-2">
                          Day {day.dayNumber}: {day.title}
                        </p>
                        <div className="space-y-2">
                          {day.segments.map((segment, i) => {
                            const isSwapped = swapTitles.has(segment.title);
                            const replacement = swapMap.get(segment.title);

                            if (isSwapped && replacement) {
                              return (
                                <div key={i} className="bg-teal/5 border border-teal/20 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                                      Swapped
                                    </span>
                                    {replacement.ageRange && (
                                      <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                                        {AGE_LABELS[replacement.ageRange] || replacement.ageRange}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm font-bold text-teal">{replacement.title}</p>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{replacement.description}</p>
                                  <p className="text-[10px] text-gray-400 mt-1 line-through">{segment.title}</p>
                                </div>
                              );
                            }

                            return (
                              <div key={i} className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm font-semibold text-body">{segment.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{segment.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 bg-gray-200 text-gray-500 rounded-full px-6 py-3 text-xs font-semibold tracking-widest-custom uppercase cursor-not-allowed">
                    Save Adapted Version (Coming Soon)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
