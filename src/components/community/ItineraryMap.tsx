"use client";

import { useEffect, useRef } from "react";
import type L from "leaflet";

interface Place {
  name: string;
  lat?: number;
  lng?: number;
}

interface Segment {
  title: string;
  places: Place[];
}

interface Day {
  dayNumber: number;
  title: string;
  segments: Segment[];
}

const DAY_COLORS = [
  "#0d9488", // teal
  "#d97706", // amber
  "#7c3aed", // violet
  "#dc2626", // red
  "#059669", // emerald
  "#2563eb", // blue
  "#c026d3", // fuchsia
];

function collectPoints(days: Day[]) {
  const points: { lat: number; lng: number; name: string; segmentTitle: string; dayIndex: number; label: string }[] = [];
  for (const day of days) {
    for (let s = 0; s < day.segments.length; s++) {
      for (const place of day.segments[s].places) {
        if (place.lat && place.lng) {
          points.push({
            lat: place.lat,
            lng: place.lng,
            name: place.name,
            segmentTitle: day.segments[s].title,
            dayIndex: day.dayNumber - 1,
            label: `${day.dayNumber}.${s + 1}`,
          });
        }
      }
    }
  }
  return points;
}

export default function ItineraryMap({ days }: { days: Day[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const points = collectPoints(days);

  useEffect(() => {
    if (!mapRef.current || points.length < 2 || mapInstanceRef.current) return;

    let map: L.Map;

    (async () => {
      const leaflet = await import("leaflet");

      if (!mapRef.current || mapInstanceRef.current) return;

      map = leaflet.map(mapRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      });
      mapInstanceRef.current = map;

      leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const bounds = leaflet.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });

      const lineCoords = points.map((p) => [p.lat, p.lng] as [number, number]);
      leaflet.polyline(lineCoords, {
        color: "#94a3b8",
        weight: 2,
        dashArray: "8 6",
        opacity: 0.7,
      }).addTo(map);

      for (const point of points) {
        const color = DAY_COLORS[point.dayIndex % DAY_COLORS.length];

        const icon = leaflet.divIcon({
          className: "itinerary-map-marker",
          html: `<div style="
            width: 28px; height: 28px; border-radius: 50%;
            background: ${color}; border: 2px solid white;
            display: flex; align-items: center; justify-content: center;
            color: white; font-size: 10px; font-weight: 700;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          ">${point.label}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        leaflet.marker([point.lat, point.lng], { icon })
          .bindPopup(`<strong>${point.name}</strong><br/><span style="color:#666;font-size:12px">${point.segmentTitle}</span>`)
          .addTo(map);
      }
    })();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (points.length < 2) return null;

  const dayNumbers = [...new Set(points.map((p) => p.dayIndex))];

  return (
    <div className="bg-cream rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">Your Route</h3>
      </div>

      <div ref={mapRef} className="w-full h-[400px] rounded-xl overflow-hidden" />

      <div className="flex flex-wrap gap-3 mt-3">
        {dayNumbers.map((dayIdx) => {
          const day = days[dayIdx];
          const color = DAY_COLORS[dayIdx % DAY_COLORS.length];
          return (
            <span key={dayIdx} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              Day {day.dayNumber}
            </span>
          );
        })}
      </div>
    </div>
  );
}
