import Image from "next/image";
import Link from "next/link";

interface ContributorBadgeProps {
  name: string;
  slug: string;
  avatar: string;
  type: "local" | "visitor" | "creator";
  size?: "sm" | "md";
}

const TYPE_LABELS: Record<string, string> = {
  local: "Local",
  visitor: "Visitor",
  creator: "Creator",
};

export default function ContributorBadge({ name, slug, avatar, type, size = "sm" }: ContributorBadgeProps) {
  const avatarSize = size === "md" ? "w-10 h-10" : "w-7 h-7";
  const textSize = size === "md" ? "text-sm" : "text-xs";

  return (
    <Link href={`/community/contributors/${slug}/`} className="inline-flex items-center gap-2 group">
      <div className={`${avatarSize} rounded-full overflow-hidden relative shrink-0`}>
        <Image src={avatar} alt={name} fill className="object-cover" unoptimized />
      </div>
      <span className={`${textSize} font-semibold text-gray-700 group-hover:text-teal transition-colors`}>
        {name}
      </span>
      <span
        className={`${textSize} font-semibold tracking-widest-custom uppercase px-2 py-0.5 rounded-full ${
          type === "local"
            ? "bg-teal/10 text-teal"
            : type === "creator"
              ? "bg-copper/10 text-copper"
              : "bg-gray-100 text-gray-500"
        }`}
      >
        {TYPE_LABELS[type]}
        {type === "creator" && (
          <svg className="inline w-3 h-3 ml-0.5 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </Link>
  );
}
