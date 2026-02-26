"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CourseData {
  slug: string;
  name: string;
  holes: number;
  par: number;
  type: string;
  location: string;
  description: string;
  greenFee: string;
  image: string;
  bestTime: string;
  localTip: string;
  crowdPressure: { level: string; peakMonths: number[]; quietMonths: number[] };
  operatorNote: string;
}

const CROWD_STYLES: Record<string, { label: string; color: string }> = {
  low: { label: "Usually quiet", color: "text-green-700 bg-green-100" },
  moderate: { label: "Moderate", color: "text-amber-700 bg-amber-100" },
  high: { label: "Book ahead", color: "text-orange-700 bg-orange-100" },
};

const MONTH_LABELS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function MiniCrowdChart({ peakMonths, quietMonths }: { peakMonths: number[]; quietMonths: number[] }) {
  const currentMonth = new Date().getMonth();
  return (
    <div className="flex items-end gap-[2px] h-6">
      {Array.from({ length: 12 }, (_, i) => {
        const isPeak = peakMonths.includes(i);
        const isQuiet = quietMonths.includes(i);
        const height = isPeak ? 22 : isQuiet ? 6 : 14;
        const color = isPeak ? "bg-orange-400" : isQuiet ? "bg-green-400" : "bg-amber-300";
        return (
          <div
            key={i}
            className={`flex-1 rounded-t-sm ${color} ${i === currentMonth ? "ring-1 ring-gray-700 opacity-100" : "opacity-50"}`}
            style={{ height: `${height}px` }}
            title={`${MONTH_LABELS[i]} — ${isPeak ? "Busy" : isQuiet ? "Quiet" : "Average"}`}
          />
        );
      })}
    </div>
  );
}

export default function GolfCourseCard({ course }: { course: CourseData }) {
  const [expanded, setExpanded] = useState(false);
  const crowd = CROWD_STYLES[course.crowdPressure.level] || CROWD_STYLES.moderate;

  return (
    <div className="bg-cream rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        {/* Image */}
        <div className="relative h-[200px] md:h-auto md:w-[280px] shrink-0">
          <Image
            src={course.image}
            alt={course.name}
            fill
            className="object-cover"
            unoptimized
          />
          <span className={`absolute top-3 left-3 text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-1 rounded-full ${crowd.color}`}>
            {crowd.label}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                href={`/listing/${course.slug}/`}
                className="text-lg font-bold text-teal hover:text-teal-light transition-colors"
              >
                {course.name}
              </Link>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-gray-500">
                  {course.holes} holes · Par {course.par}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-gray-500">
                  {course.type}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-gray-500">
                  {course.location}
                </span>
              </div>
            </div>
            <span className="text-sm font-bold text-copper shrink-0">{course.greenFee}</span>
          </div>

          <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-2">{course.description}</p>

          {/* Best time badge */}
          <div className="flex items-center gap-2 mt-3">
            <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-green-700 font-semibold">{course.bestTime}</span>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs font-semibold tracking-widest-custom uppercase text-teal hover:text-teal-light transition-colors inline-flex items-center gap-1"
          >
            {expanded ? "Less" : "Local tip & details"}
            <svg className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              {/* Local tip */}
              <div className="bg-copper/5 border border-copper/20 rounded-xl p-3">
                <p className="text-[10px] font-semibold tracking-widest-custom uppercase text-copper mb-1">Local Tip</p>
                <p className="text-xs text-gray-700 leading-relaxed">{course.localTip}</p>
              </div>

              {/* Operator note */}
              <div className="bg-teal/5 border border-teal/20 rounded-xl p-3">
                <p className="text-[10px] font-semibold tracking-widest-custom uppercase text-teal mb-1">From the Operator</p>
                <p className="text-xs text-gray-700 leading-relaxed">{course.operatorNote}</p>
              </div>

              {/* Mini crowd chart */}
              <div>
                <p className="text-[10px] font-semibold tracking-widest-custom uppercase text-gray-400 mb-2">Busyness by Month</p>
                <MiniCrowdChart peakMonths={course.crowdPressure.peakMonths} quietMonths={course.crowdPressure.quietMonths} />
                <div className="flex gap-[2px] mt-1">
                  {MONTH_LABELS.map((l, i) => (
                    <span key={i} className="flex-1 text-center text-[7px] text-gray-400">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
