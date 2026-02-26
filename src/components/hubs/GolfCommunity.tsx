interface Tip {
  author: string;
  authorType: string;
  text: string;
  helpful: number;
}

const TYPE_BADGES: Record<string, { label: string; color: string }> = {
  local: { label: "Local", color: "bg-teal/10 text-teal" },
  visitor: { label: "Visitor", color: "bg-copper/10 text-copper" },
};

export default function GolfCommunity({ tips }: { tips: Tip[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-teal tracking-widest-custom uppercase">
            From the Community
          </h2>
          <p className="text-xs text-gray-500">Tips and recommendations from golfers who&apos;ve played here</p>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip, i) => {
          const badge = TYPE_BADGES[tip.authorType] || TYPE_BADGES.visitor;
          return (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-body">{tip.author}</span>
                <span className={`text-[10px] font-semibold tracking-widest-custom uppercase px-2 py-0.5 rounded-full ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{tip.text}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>{tip.helpful} found this helpful</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
