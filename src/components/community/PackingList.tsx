interface PackingItem {
  item: string;
  essential: boolean;
}

export default function PackingList({ items }: { items: PackingItem[] }) {
  const essentials = items.filter((i) => i.essential);
  const niceToHave = items.filter((i) => !i.essential);

  return (
    <div className="bg-cream rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">Packing List</h3>
      </div>

      {essentials.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold tracking-widest-custom uppercase text-copper mb-2">Essentials</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {essentials.map((item) => (
              <div key={item.item} className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item.item}
              </div>
            ))}
          </div>
        </div>
      )}

      {niceToHave.length > 0 && (
        <div>
          <p className="text-xs font-semibold tracking-widest-custom uppercase text-gray-400 mb-2">Nice to Have</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {niceToHave.map((item) => (
              <div key={item.item} className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item.item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
