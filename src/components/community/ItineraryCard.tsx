import Image from "next/image";
import Link from "next/link";
import ContributorBadge from "./ContributorBadge";
import UpvoteButton from "./UpvoteButton";

interface ItineraryCardProps {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  duration: string;
  tripDate: string;
  categories: string[];
  upvotes: number;
  commentCount: number;
  contributor: {
    name: string;
    slug: string;
    avatar: string;
    type: "local" | "visitor" | "creator";
  };
}

export default function ItineraryCard({
  slug,
  title,
  summary,
  coverImage,
  duration,
  tripDate,
  categories,
  upvotes,
  commentCount,
  contributor,
}: ItineraryCardProps) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-cream hover:shadow-lg transition-shadow">
      <Link href={`/community/${slug}/`}>
        <div className="relative h-[220px]">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            {categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="bg-white/90 text-teal text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <ContributorBadge
            name={contributor.name}
            slug={contributor.slug}
            avatar={contributor.avatar}
            type={contributor.type}
          />
          <span className="text-[10px] text-gray-400 tracking-widest-custom uppercase">{duration}</span>
        </div>
        <Link href={`/community/${slug}/`}>
          <h3 className="text-lg font-bold text-teal mt-1 group-hover:text-teal-light transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">{summary}</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
          <UpvoteButton count={upvotes} />
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {commentCount}
          </span>
        </div>
      </div>
    </div>
  );
}
