"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import itinerariesData from "@/data/community-itineraries.json";

type SavedItem = { id: string; type: string; title: string };

const itineraries = itinerariesData as Record<string, { title: string; duration: string; durationDays: number; coverImage: string; summary: string }>;

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

  const totalDays = items.reduce((sum, item) => {
    if (item.type === "itinerary") {
      const it = itineraries[item.id];
      return sum + (it?.durationDays || 0);
    }
    return sum;
  }, 0);

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
            My Trip
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Your saved itineraries and recommendations. Plan your Queenstown adventure.
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
              {totalDays >= 3 && (
                <div className="bg-teal/5 border border-teal/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-teal font-semibold">
                    {totalDays} days of activities saved — consider extending your stay!
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    You&apos;ve got enough saved for a great trip. Each extra day unlocks more of what makes Queenstown special.
                  </p>
                </div>
              )}

              <div className="space-y-4">
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
