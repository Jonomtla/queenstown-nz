interface Place {
  name: string;
  lat?: number;
  lng?: number;
}

interface Segment {
  places: Place[];
}

interface Day {
  dayNumber: number;
  title: string;
  segments: Segment[];
}

const DAY_COLORS = [
  "#0d9488", // teal
  "#d97706", // amber
  "#7c3aed", // violet
  "#dc2626", // red
  "#059669", // emerald
  "#2563eb", // blue
  "#c026d3", // fuchsia
];

export default function ItineraryMap({ days }: { days: Day[] }) {
  // Collect all points with coordinates
  const points: { lat: number; lng: number; name: string; dayIndex: number; label: string }[] = [];
  let segIdx = 0;

  for (const day of days) {
    for (let s = 0; s < day.segments.length; s++) {
      for (const place of day.segments[s].places) {
        if (place.lat && place.lng) {
          segIdx++;
          points.push({
            lat: place.lat,
            lng: place.lng,
            name: place.name,
            dayIndex: day.dayNumber - 1,
            label: `${day.dayNumber}.${s + 1}`,
          });
        }
      }
    }
  }

  if (points.length < 2) return null;

  // Calculate bounds with padding
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat || 0.01;
  const lngRange = maxLng - minLng || 0.01;
  const padding = 40;
  const width = 600;
  const height = 400;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const toX = (lng: number) => padding + ((lng - minLng) / lngRange) * innerW;
  // Invert Y since lat increases northward
  const toY = (lat: number) => padding + ((maxLat - lat) / latRange) * innerH;

  // Unique days for legend
  const dayNumbers = [...new Set(points.map((p) => p.dayIndex))];

  return (
    <div className="bg-cream rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <h3 className="text-sm font-bold tracking-widest-custom uppercase text-teal">Your Route</h3>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Route overview map">
        {/* Background */}
        <rect x="0" y="0" width={width} height={height} rx="12" fill="#f5f5f0" />

        {/* Connecting lines */}
        {points.slice(1).map((point, i) => {
          const prev = points[i];
          return (
            <line
              key={`line-${i}`}
              x1={toX(prev.lng)}
              y1={toY(prev.lat)}
              x2={toX(point.lng)}
              y2={toY(point.lat)}
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.6"
            />
          );
        })}

        {/* Pins */}
        {points.map((point, i) => {
          const color = DAY_COLORS[point.dayIndex % DAY_COLORS.length];
          const x = toX(point.lng);
          const y = toY(point.lat);
          return (
            <g key={`pin-${i}`}>
              <title>{point.name}</title>
              <circle cx={x} cy={y} r="14" fill={color} opacity="0.15" />
              <circle cx={x} cy={y} r="8" fill={color} stroke="white" strokeWidth="2" />
              <text
                x={x}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="7"
                fontWeight="bold"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3">
        {dayNumbers.map((dayIdx) => {
          const day = days[dayIdx];
          const color = DAY_COLORS[dayIdx % DAY_COLORS.length];
          return (
            <span key={dayIdx} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              Day {day.dayNumber}
            </span>
          );
        })}
      </div>
    </div>
  );
}
