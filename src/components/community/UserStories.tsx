import Image from "next/image";
import Link from "next/link";
import contributorsData from "@/data/community-contributors.json";

type Contributor = {
  name: string;
  avatar: string;
  type: "local" | "visitor" | "creator";
};

const contributors = contributorsData as Record<string, Contributor>;

const TYPE_COLORS: Record<string, string> = {
  local: "bg-teal/10 text-teal",
  visitor: "bg-gray-100 text-gray-500",
  creator: "bg-copper/10 text-copper",
};

interface UserStory {
  authorSlug: string;
  text: string;
  date: string;
  photo?: string;
}

export default function UserStories({ stories }: { stories: UserStory[] }) {
  if (!stories || stories.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">
          {stories.length} {stories.length === 1 ? "person" : "people"} followed this
        </h3>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
        {stories.map((story, i) => {
          const contrib = contributors[story.authorSlug];
          if (!contrib) return null;
          return (
            <div key={i} className="bg-cream rounded-xl p-4 min-w-[260px] max-w-[300px] shrink-0 snap-start">
              {story.photo && (
                <div className="relative h-[140px] rounded-lg overflow-hidden mb-3">
                  <Image src={story.photo} alt="" fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Link href={`/community/contributors/${story.authorSlug}/`} className="shrink-0">
                  <div className="w-7 h-7 rounded-full overflow-hidden relative">
                    <Image src={contrib.avatar} alt={contrib.name} fill className="object-cover" unoptimized />
                  </div>
                </Link>
                <Link href={`/community/contributors/${story.authorSlug}/`} className="text-sm font-semibold text-gray-700 hover:text-teal transition-colors truncate">
                  {contrib.name}
                </Link>
                <span className={`text-[9px] font-semibold tracking-widest-custom uppercase px-1.5 py-0.5 rounded-full shrink-0 ${TYPE_COLORS[contrib.type] || TYPE_COLORS.visitor}`}>
                  {contrib.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{story.text}</p>
              <p className="text-xs text-gray-400 mt-2">{story.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
