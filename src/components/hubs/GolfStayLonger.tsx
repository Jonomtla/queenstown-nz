interface StayLongerData {
  averageGolfTrip: number;
  recommendedDays: number;
  stat: string;
  nudge: string;
}

export default function GolfStayLonger({ data, courseCount }: { data: StayLongerData; courseCount: number }) {
  return (
    <div className="bg-gradient-to-br from-teal/5 to-green-50 border border-teal/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">
          Stay & Play
        </h3>
      </div>

      <div className="space-y-4">
        {/* Key stat */}
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-teal">{data.recommendedDays} days</p>
          <p className="text-xs text-gray-500 mt-1">recommended for golf</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Average golfer stays {data.averageGolfTrip} days</p>
        </div>

        {/* Social proof */}
        <p className="text-xs text-body font-semibold leading-relaxed">
          {data.stat}
        </p>

        {/* Course math */}
        <div className="bg-white/60 rounded-lg p-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-500">{courseCount} courses in the region</span>
            <span className="font-semibold text-teal">1 round/day</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal rounded-full h-2 transition-all"
              style={{ width: `${Math.min((data.averageGolfTrip / courseCount) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            Average golfer only plays {Math.round((data.averageGolfTrip / courseCount) * 100)}% of available courses
          </p>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">{data.nudge}</p>
      </div>
    </div>
  );
}
