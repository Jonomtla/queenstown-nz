"use client";

import { useState, useCallback } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select from a temporary input
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const share = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // User cancelled share — do nothing
      }
    } else {
      copyLink();
    }
  }, [title, copyLink]);

  return (
    <div className="flex items-center gap-2 relative">
      <button
        onClick={share}
        className="border border-teal rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest-custom uppercase text-teal hover:bg-teal hover:text-white transition-colors inline-flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
      <button
        onClick={copyLink}
        className="border border-gray-300 rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest-custom uppercase text-gray-600 hover:border-teal hover:text-teal transition-colors inline-flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {copied ? "Copied!" : "Copy Link"}
      </button>

      {/* Toast */}
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-teal text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap animate-pulse">
          Link copied!
        </span>
      )}
    </div>
  );
}
