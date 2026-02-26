"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import itinerariesData from "@/data/community-itineraries.json";
import recommendationsData from "@/data/community-recommendations.json";

type SavedItem = { id: string; type: string; title: string };

type ItineraryMeta = {
  title: string;
  duration: string;
  durationDays: number;
  coverImage: string;
  summary: string;
  categories: string[];
  season: string;
  days: { dayNumber: number; title: string; segments: { title: string; timeOfDay: string }[] }[];
};

type RecommendationMeta = {
  title: string;
  category: string;
  text: string;
};

const itineraries = itinerariesData as Record<string, ItineraryMeta>;
const recommendations = recommendationsData as Record<string, RecommendationMeta>;

type PlanDay = {
  dayNumber: number;
  label: string;
  items: { type: "segment" | "recommendation"; title: string; timeOfDay?: string; sourceSlug: string; sourceTitle: string }[];
};

function buildTripPlan(items: SavedItem[]): { days: PlanDay[]; totalDays: number; message: string } {
  const days: PlanDay[] = [];
  let dayCounter = 0;

  // First, lay out itinerary segments day by day
  const itineraryItems = items.filter(i => i.type === "itinerary");
  for (const item of itineraryItems) {
    const it = itineraries[item.id];
    if (!it) continue;
    for (const day of it.days) {
      dayCounter++;
      days.push({
        dayNumber: dayCounter,
        label: `Day ${dayCounter} — ${day.title}`,
        items: day.segments.map(seg => ({
          type: "segment" as const,
          title: seg.title,
          timeOfDay: seg.timeOfDay,
          sourceSlug: item.id,
          sourceTitle: it.title,
        })),
      });
    }
  }

  // Then group recommendations into the last day or a new day
  const recItems = items.filter(i => i.type === "recommendation");
  if (recItems.length > 0) {
    const recSegments = recItems.map(item => {
      const rec = recommendations[item.id];
      return {
        type: "recommendation" as const,
        title: rec?.title || item.title,
        timeOfDay: undefined,
        sourceSlug: item.id,
        sourceTitle: rec?.title || item.title,
      };
    });

    // If we have existing days, try to tuck recommendations into them
    if (days.length > 0 && recItems.length <= 2) {
      days[days.length - 1].items.push(...recSegments);
    } else {
      dayCounter++;
      days.push({
        dayNumber: dayCounter,
        label: `Day ${dayCounter} — Recommendations & Tips`,
        items: recSegments,
      });
    }
  }

  const totalDays = dayCounter || Math.ceil(items.length / 3);

  let message = "";
  if (totalDays >= 7) {
    message = `Your trip plan covers ${totalDays} days — that's a proper deep-dive into Queenstown. You'll see things most visitors never do.`;
  } else if (totalDays >= 5) {
    message = `${totalDays} days of activities planned. Locals say 5+ days is the sweet spot — you're right there.`;
  } else if (totalDays >= 3) {
    message = `You've planned ${totalDays} days so far. Most visitors who saved this much ended up adding 1-2 more days. There's plenty more to discover.`;
  } else if (totalDays >= 1) {
    message = `${totalDays} day${totalDays > 1 ? "s" : ""} planned. Queenstown rewards time — even one more day opens up new possibilities.`;
  }

  return { days, totalDays, message };
}

const TIME_ORDER: Record<string, number> = { morning: 0, afternoon: 1, evening: 2 };

export default function SavedPage() {
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem("qt-saved-items") || "[]"));
    } catch {
      setItems([]);
    }
  }, []);

  const removeItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("qt-saved-items", JSON.stringify(updated));
    window.dispatchEvent(new Event("qt-saved-changed"));
  };

  const plan = useMemo(() => buildTripPlan(items), [items]);

  return (
    <PageLayout>
      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          <span>/</span>
          <Link href="/community/" className="hover:text-teal">Community</Link>
          <span>/</span>
          <span className="text-gray-700">My Trip</span>
        </nav>
      </div>

      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="container-wide max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-teal tracking-widest-custom uppercase mb-2">
            My Trip Plan
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Your saved experiences, organised into a day-by-day plan.
          </p>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-gray-400 text-lg mb-2">Nothing saved yet</p>
              <p className="text-gray-400 text-sm mb-6">Tap the heart icon on any itinerary or recommendation to save it here.</p>
              <Link
                href="/community/"
                className="inline-block border border-teal rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest-custom uppercase text-teal hover:bg-teal hover:text-white transition-colors"
              >
                Explore Community
              </Link>
            </div>
          ) : (
            <>
              {/* Stay longer message */}
              {plan.message && (
                <div className="bg-gradient-to-r from-teal/5 to-copper/5 border border-teal/20 rounded-xl p-5 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-teal font-semibold">{plan.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Average Queenstown visit: 3.1 days. Locals recommend: 5+ days. You&apos;ve got {plan.totalDays} days planned.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Day-by-day plan */}
              {plan.days.length > 0 && (
                <div className="space-y-8 mb-8">
                  {plan.days.map((day) => (
                    <div key={day.dayNumber}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center shrink-0">
                          {day.dayNumber}
                        </span>
                        <h2 className="text-base font-bold text-teal tracking-widest-custom uppercase">
                          {day.label}
                        </h2>
                      </div>
                      <div className="ml-4 border-l-2 border-gray-200 pl-6 space-y-3">
                        {day.items
                          .sort((a, b) => (TIME_ORDER[a.timeOfDay || ""] ?? 3) - (TIME_ORDER[b.timeOfDay || ""] ?? 3))
                          .map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            {item.timeOfDay && (
                              <span className={`text-[10px] font-semibold tracking-widest-custom uppercase px-2 py-0.5 rounded-full shrink-0 ${
                                item.timeOfDay === "morning" ? "bg-copper/10 text-copper" :
                                item.timeOfDay === "afternoon" ? "bg-teal/10 text-teal" :
                                "bg-gray-100 text-gray-600"
                              }`}>
                                {item.timeOfDay}
                              </span>
                            )}
                            {item.type === "recommendation" && (
                              <span className="text-[10px] font-semibold tracking-widest-custom uppercase px-2 py-0.5 rounded-full bg-copper/10 text-copper shrink-0">
                                Tip
                              </span>
                            )}
                            <span className="text-sm text-gray-700">{item.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Raw saved list with remove buttons */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold tracking-widest-custom uppercase text-gray-400 mb-4">
                  Saved Items ({items.length})
                </h3>
                <div className="space-y-3">
                  {items.map((item) => {
                    const itinerary = item.type === "itinerary" ? itineraries[item.id] : null;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-cream rounded-xl p-4 group"
                      >
                        <svg className="w-5 h-5 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={item.type === "itinerary" ? `/community/${item.id}/` : "#"}
                            className="text-sm font-semibold text-gray-700 hover:text-teal transition-colors"
                          >
                            {item.title}
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                            <span className="capitalize">{item.type}</span>
                            {itinerary && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span>{itinerary.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                          aria-label="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/community/"
                  className="inline-block text-xs font-semibold tracking-widest-custom uppercase text-teal hover:text-teal-light transition-colors"
                >
                  ← Back to Community
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
