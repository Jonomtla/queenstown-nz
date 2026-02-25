import Image from "next/image";
import Link from "next/link";
import contributorsData from "@/data/community-contributors.json";

type Contributor = { name: string; avatar: string; type: string };
const contributors = contributorsData as Record<string, Contributor>;

interface Comment {
  author: string;
  authorSlug: string;
  authorType: string;
  date: string;
  text: string;
  type?: "question" | "answer" | "tip";
  replies?: Comment[];
}

const COMMENT_TYPE_STYLES: Record<string, { label: string; color: string }> = {
  question: { label: "Question", color: "bg-teal/10 text-teal" },
  answer: { label: "Local Answer", color: "bg-copper/10 text-copper" },
  tip: { label: "Tip", color: "bg-amber-100 text-amber-700" },
};

function CommentItem({ comment, isReply }: { comment: Comment; isReply?: boolean }) {
  const contrib = contributors[comment.authorSlug];
  const avatar = contrib?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face";
  const typeStyle = comment.type ? COMMENT_TYPE_STYLES[comment.type] : null;
  const isQuestion = comment.type === "question";
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={isReply ? "ml-12 mt-4" : ""}>
      <div className="flex items-start gap-3">
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
            {typeStyle && (
              <span className={`text-[10px] font-semibold tracking-widest-custom uppercase px-1.5 py-0.5 rounded-full ${typeStyle.color}`}>
                {typeStyle.label}
              </span>
            )}
            <span className="text-xs text-gray-400">{comment.date}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{comment.text}</p>
          {isQuestion && !hasReplies && (
            <p className="text-xs text-gray-400 italic mt-1">Awaiting answer...</p>
          )}
        </div>
      </div>
      {comment.replies?.map((reply, i) => (
        <CommentItem key={i} comment={reply} isReply />
      ))}
    </div>
  );
}

export default function CommentSection({ comments }: { comments: Comment[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-teal tracking-widest-custom uppercase mb-6">
        Ask a Local ({comments.length})
      </h3>

      <div className="space-y-6">
        {comments.map((comment, i) => (
          <CommentItem key={i} comment={comment} />
        ))}
      </div>

      {/* Fake "Add comment" input */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1">
            <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed">
              Ask a question or share a tip...
            </div>
            <p className="text-xs text-gray-400 mt-2">Sign in to join the conversation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
