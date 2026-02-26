"use client";

import { useState } from "react";

const PROMPTS = [
  { label: "Share an itinerary", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", description: "What did you do? Share your day-by-day trip plan." },
  { label: "Write a tip", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", description: "A hidden gem, a timing hack, a place to avoid?" },
  { label: "Add a photo", icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z", description: "Show others what Queenstown really looks like." },
];

export default function ContributeBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm">
      {/* Collapsed state — clickable prompt */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 text-left group"
      >
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="text-gray-400 group-hover:text-gray-600 transition-colors text-sm flex-1">
          Share your Queenstown experience...
        </span>
        <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-teal bg-teal/10 px-3 py-1.5 rounded-full">
          Contribute
        </span>
      </button>

      {/* Expanded state — prompt options */}
      {expanded && (
        <div className="mt-5 pt-5 border-t border-gray-100">
          <div className="grid sm:grid-cols-3 gap-3">
            {PROMPTS.map((prompt) => (
              <button
                key={prompt.label}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-teal/30 hover:bg-teal/5 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-full bg-teal/10 group-hover:bg-teal/20 flex items-center justify-center shrink-0 transition-colors">
                  <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={prompt.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-body">{prompt.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{prompt.description}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-4 text-center">
            Your contributions help other travellers plan better trips and support Queenstown&apos;s community.
          </p>
        </div>
      )}
    </div>
  );
}
