"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ContributorBadge from "./ContributorBadge";
import UpvoteButton from "./UpvoteButton";
import contributorsData from "@/data/community-contributors.json";

type ContributorData = { name: string; avatar: string; type: string };
const allContributors = contributorsData as Record<string, ContributorData>;

interface Comment {
  author: string;
  authorSlug: string;
  authorType: string;
  date: string;
  text: string;
}

interface RecommendationCardProps {
  slug: string;
  title: string;
  text: string;
  category: string;
  upvotes: number;
  commentCount: number;
  date: string;
  contributor: {
    name: string;
    slug: string;
    avatar: string;
    type: "local" | "visitor" | "creator";
  };
  places?: { name: string; listingSlug?: string }[];
  comments?: Comment[];
}

const CATEGORY_STYLES: Record<string, { border: string }> = {
  dining: { border: "border-l-copper" },
  skiing: { border: "border-l-teal" },
  adventure: { border: "border-l-copper" },
  outdoor: { border: "border-l-teal" },
  photography: { border: "border-l-copper" },
  family: { border: "border-l-teal" },
  budget: { border: "border-l-teal" },
  transport: { border: "border-l-gray-400" },
  hiking: { border: "border-l-teal" },
};

function RecommendationModal({
  title,
  text,
  category,
  upvotes,
  commentCount,
  contributor,
  places,
  comments,
  onClose,
}: RecommendationCardProps & { onClose: () => void }) {
  const style = CATEGORY_STYLES[category] || { border: "border-l-gray-300" };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rec-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-l-4 ${style.border}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-copper">
              {category}
            </span>
            <UpvoteButton count={upvotes} />
          </div>

          <h2 id="rec-modal-title" className="text-xl md:text-2xl font-bold text-teal leading-snug">{title}</h2>

          {/* Author */}
          <div className="mt-4">
            <ContributorBadge
              name={contributor.name}
              slug={contributor.slug}
              avatar={contributor.avatar}
              type={contributor.type}
              size="md"
            />
          </div>

          {/* Full text */}
          <p className="text-gray-600 text-base mt-6 leading-relaxed">{text}</p>

          {/* Places */}
          {places && places.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {places.map((place) =>
                place.listingSlug ? (
                  <Link
                    key={place.name}
                    href={`/listing/${place.listingSlug}/`}
                    className="text-xs font-semibold tracking-widest-custom uppercase text-teal bg-teal/5 px-3 py-1 rounded-full hover:bg-teal/10 transition-colors"
                  >
                    {place.name}
                  </Link>
                ) : (
                  <span
                    key={place.name}
                    className="text-xs font-semibold tracking-widest-custom uppercase text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    {place.name}
                  </span>
                )
              )}
            </div>
          )}

          {/* Comments */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal mb-5">
              Comments ({commentCount})
            </h3>

            {(!comments || comments.length === 0) && (
              <p className="text-sm text-gray-400 mb-6">No comments yet. Be the first to share your thoughts.</p>
            )}

            {comments && comments.length > 0 && (
              <div className="space-y-5 mb-6">
                {comments.map((comment, i) => {
                  const cData = allContributors[comment.authorSlug];
                  const avatar = cData?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face";
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Link href={`/community/contributors/${comment.authorSlug}/`} className="shrink-0">
                        <div className="w-8 h-8 rounded-full overflow-hidden relative">
                          <Image src={avatar} alt={comment.author} fill className="object-cover" unoptimized />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/community/contributors/${comment.authorSlug}/`}
                            className="text-sm font-semibold text-gray-700 hover:text-teal transition-colors"
                          >
                            {comment.author}
                          </Link>
                          <span
                            className={`text-[10px] font-semibold tracking-widest-custom uppercase px-1.5 py-0.5 rounded-full ${
                              comment.authorType === "local"
                                ? "bg-teal/10 text-teal"
                                : comment.authorType === "creator"
                                  ? "bg-copper/10 text-copper"
                                  : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {comment.authorType}
                          </span>
                          <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Fake add comment */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed">
                  Share your experience or ask a question...
                </div>
                <p className="text-xs text-gray-400 mt-2">Sign in to join the conversation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecommendationCard(props: RecommendationCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [modalOpen]);
  const { title, text, category, upvotes, commentCount, contributor, places } = props;
  const style = CATEGORY_STYLES[category] || { border: "border-l-gray-300" };

  return (
    <>
      <div
        className={`rounded-2xl bg-cream p-5 border-l-4 ${style.border} hover:shadow-lg transition-shadow cursor-pointer`}
        onClick={() => setModalOpen(true)}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="text-[10px] font-semibold tracking-widest-custom uppercase text-copper">
            {category}
          </span>
          <UpvoteButton count={upvotes} />
        </div>
        <h3 className="text-base font-bold text-teal leading-snug line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-4">{text}</p>

        {places && places.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3" onClick={(e) => e.stopPropagation()}>
            {places.map((place) =>
              place.listingSlug ? (
                <Link
                  key={place.name}
                  href={`/listing/${place.listingSlug}/`}
                  className="text-[10px] font-semibold tracking-widest-custom uppercase text-teal bg-teal/5 px-2 py-0.5 rounded-full hover:bg-teal/10 transition-colors"
                >
                  {place.name}
                </Link>
              ) : (
                <span
                  key={place.name}
                  className="text-[10px] font-semibold tracking-widest-custom uppercase text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                >
                  {place.name}
                </span>
              )
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200" onClick={(e) => e.stopPropagation()}>
          <ContributorBadge
            name={contributor.name}
            slug={contributor.slug}
            avatar={contributor.avatar}
            type={contributor.type}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
            aria-label={`${commentCount} comments — view details`}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {commentCount}
          </button>
        </div>
      </div>

      {modalOpen && (
        <RecommendationModal {...props} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
