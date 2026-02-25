import Image from "next/image";

const FEATURED_EVENT = {
  title: "New Zealand Open",
  date: { month: "Feb", day: "26" },
  excerpt:
    "The 105th edition of the New Zealand Open will tee off from 26 February to 1 March 2026, hosted at the stunning Millbrook Resort...",
  image:
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_3439,y_4457/v1/clients/queenstownnz/Queenstown_Golf_Club_8__4de95f71-8986-4f98-bd7d-30d79056c6db.jpg",
  alt: "Aerial view of golf course with mountains",
};

const SIDE_EVENTS = [
  { title: "The Motatapu", date: { month: "Mar", day: "07" } },
  { title: "Arrowtown Autumn Festival", date: { month: "Apr", day: "15" }, subtitle: "Recurring daily" },
  { title: "Routeburn Classic", date: { month: "Apr", day: "18" } },
];

export default function EventsSection() {
  return (
    <section className="bg-white py-20 px-8 md:px-20 lg:px-24">
      <div className="container-wide">
        <h2 className="text-3xl md:text-4xl font-bold text-teal tracking-widest-custom uppercase leading-tight">
          Queenstown Event & Festival Guide
        </h2>
        <p className="text-body mt-4 max-w-3xl leading-relaxed">
          Queenstown is home to talented artists, artisans, musicians and
          athletes, hosting events big and small. Our social calendar is always
          pretty full! From festivals and sporting events, to markets and
          community planting days, there&apos;s always something on in
          Queenstown.
        </p>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 mt-10">
          {/* Featured event */}
          <div className="bg-cream rounded-2xl overflow-hidden">
            <div className="relative h-[300px]">
              <Image
                src={FEATURED_EVENT.image}
                alt={FEATURED_EVENT.alt}
                fill
                className="object-cover"
              />
              {/* Date badge */}
              <div className="absolute top-4 left-4 bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
                <span className="text-xs text-teal font-semibold">
                  {FEATURED_EVENT.date.month}
                </span>
                <span className="text-2xl font-bold text-teal leading-none">
                  {FEATURED_EVENT.date.day}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-teal tracking-widest-custom uppercase">
                {FEATURED_EVENT.title}
              </h3>
              <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                {FEATURED_EVENT.excerpt}
              </p>
              <a
                href="#"
                className="inline-block mt-4 bg-teal text-white font-semibold tracking-widest-custom uppercase text-xs px-8 py-3 rounded-full hover:bg-teal-dark transition-colors"
              >
                See Event
              </a>
            </div>
          </div>

          {/* Side events */}
          <div className="flex flex-col justify-between">
            {SIDE_EVENTS.map((event) => (
              <div
                key={event.title}
                className="flex items-center gap-5 py-4"
              >
                <div className="bg-teal/10 rounded-full w-16 h-16 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs text-teal font-semibold">
                    {event.date.month}
                  </span>
                  <span className="text-2xl font-bold text-teal leading-none">
                    {event.date.day}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-teal tracking-widest-custom uppercase text-sm">
                    {event.title}
                  </h4>
                  {event.subtitle && (
                    <p className="text-gray-400 text-sm">{event.subtitle}</p>
                  )}
                  <a
                    href="#"
                    className="inline-block mt-2 border border-gray-300 rounded-full px-6 py-1.5 text-xs font-semibold tracking-widest-custom uppercase text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    See Event
                  </a>
                </div>
              </div>
            ))}

            <a
              href="/things-to-do/events/"
              className="mt-6 bg-teal text-white font-semibold tracking-widest-custom uppercase text-sm px-8 py-4 rounded-full text-center hover:bg-teal-dark transition-colors"
            >
              Discover All Events
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
