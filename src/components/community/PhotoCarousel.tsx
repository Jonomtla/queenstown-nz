"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  caption: string;
}

export default function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStart = useRef<number | null>(null);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1)), [photos.length]);
  const next = useCallback(() => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1)), [photos.length]);

  const handlePointerDown = (e: React.PointerEvent) => {
    touchStart.current = e.clientX;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStart.current === null) return;
    const diff = e.clientX - touchStart.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? prev() : next();
    }
    touchStart.current = null;
  };

  if (photos.length === 0) return null;

  return (
    <>
      <div className="rounded-xl overflow-hidden bg-gray-100 relative group">
        {/* Main image */}
        <div
          className="relative h-[300px] md:h-[420px] cursor-pointer"
          onClick={() => setLightbox(true)}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <Image
            src={photos[current].src}
            alt={photos[current].caption}
            fill
            className="object-cover"
            unoptimized
          />
          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-10">
            <p className="text-white text-sm">{photos[current].caption}</p>
          </div>
        </div>

        {/* Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots (mobile) + Thumbnails (desktop) */}
        {photos.length > 1 && (
          <>
            {/* Dots for mobile */}
            <div className="flex md:hidden justify-center gap-1.5 py-3">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-teal" : "bg-gray-300"}`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
            {/* Thumbnails for desktop */}
            <div className="hidden md:flex gap-2 p-3 overflow-x-auto">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 ring-2 transition-all ${
                    i === current ? "ring-teal" : "ring-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={photo.src} alt={photo.caption} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-5xl h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[current].src}
              alt={photos[current].caption}
              fill
              className="object-contain"
              unoptimized
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white text-sm bg-black/40 inline-block px-4 py-2 rounded-full">
                {photos[current].caption} — {current + 1} / {photos.length}
              </p>
            </div>
            {photos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                  aria-label="Previous photo"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                  aria-label="Next photo"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
