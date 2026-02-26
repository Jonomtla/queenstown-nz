"use client";

import { useState, useEffect } from "react";

export default function QuickSharePrompt() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <>
      {/* Expanded card */}
      {open && (
        <div className="fixed bottom-20 right-4 z-40 w-[280px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-2">
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-teal">Just experienced something?</p>
              <button
                onClick={() => { setOpen(false); setDismissed(true); }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">Share it while it&apos;s fresh.</p>

            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-teal/5 hover:bg-teal/10 transition-colors text-left group">
                <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal/20 transition-colors">
                  <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Rate an experience</p>
                  <p className="text-[10px] text-gray-400">Was it worth staying longer for?</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-copper/5 hover:bg-copper/10 transition-colors text-left group">
                <div className="w-8 h-8 rounded-full bg-copper/10 flex items-center justify-center shrink-0 group-hover:bg-copper/20 transition-colors">
                  <svg className="w-4 h-4 text-copper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Share a tip</p>
                  <p className="text-[10px] text-gray-400">Help the next person</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Add a photo</p>
                  <p className="text-[10px] text-gray-400">Coming soon</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Quick share"
        className={`fixed bottom-4 right-4 z-40 w-14 h-14 rounded-full bg-teal text-white shadow-lg hover:bg-teal-light transition-all flex items-center justify-center ${
          pulse ? "animate-pulse" : ""
        } ${open ? "rotate-45" : ""}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </>
  );
}
