"use client";

import { useState, useEffect } from "react";

interface SaveButtonProps {
  itemId: string;
  itemType: "itinerary" | "recommendation";
  title: string;
  saveCount?: number;
  variant?: "full" | "compact";
}

function getSavedItems(): { id: string; type: string; title: string }[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("qt-saved-items") || "[]");
  } catch {
    return [];
  }
}

function setSavedItems(items: { id: string; type: string; title: string }[]) {
  localStorage.setItem("qt-saved-items", JSON.stringify(items));
  window.dispatchEvent(new Event("qt-saved-changed"));
}

export function useSavedItems() {
  const [items, setItems] = useState<{ id: string; type: string; title: string }[]>([]);

  useEffect(() => {
    setItems(getSavedItems());
    const handler = () => setItems(getSavedItems());
    window.addEventListener("qt-saved-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("qt-saved-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return items;
}

export default function SaveButton({ itemId, itemType, title, saveCount, variant = "full" }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const items = getSavedItems();
    setSaved(items.some((i) => i.id === itemId));
  }, [itemId]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const items = getSavedItems();
    if (saved) {
      setSavedItems(items.filter((i) => i.id !== itemId));
      setSaved(false);
    } else {
      setSavedItems([...items, { id: itemId, type: itemType, title }]);
      setSaved(true);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={toggle}
        aria-label={saved ? "Unsave" : "Save"}
        aria-pressed={saved}
        className={`inline-flex items-center gap-1 text-sm transition-colors ${
          saved ? "text-red-500" : "text-gray-400 hover:text-red-400"
        }`}
      >
        <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 border rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest-custom uppercase transition-colors ${
        saved
          ? "border-red-400 bg-red-50 text-red-600"
          : "border-teal text-teal hover:bg-teal hover:text-white"
      }`}
    >
      <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {saved ? "Saved" : "Save This Itinerary"}
      {saveCount !== undefined && (
        <span className="text-gray-400 font-normal ml-1">{saveCount} saved</span>
      )}
    </button>
  );
}
