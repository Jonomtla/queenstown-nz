"use client";

import { useState, useEffect } from "react";
import SaveButton from "./SaveButton";

interface StickyActionBarProps {
  slug: string;
  title: string;
  duration: string;
}

export default function StickyActionBar({ slug, title, duration }: StickyActionBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 md:px-8 lg:hidden">
      <div className="flex items-center justify-between gap-3 max-w-4xl mx-auto">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-teal truncate">{title}</p>
          <p className="text-xs text-gray-400">{duration}</p>
        </div>
        <SaveButton itemId={slug} itemType="itinerary" title={title} />
      </div>
    </div>
  );
}
