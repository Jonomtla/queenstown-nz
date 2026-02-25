import Image from "next/image";

const SEASONS = [
  {
    name: "Summer",
    months: "December - February",
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1210,y_880/v1/clients/queenstownnz/Family_at_Queenstown_Bay_Playground_1__eef16657-1ae9-42c6-acbf-38456b437a10.jpg",
    alt: "Queenstown in summer",
  },
  {
    name: "Autumn",
    months: "March - May",
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_2019,y_1539/v1/clients/queenstownnz/Picnic_by_historic_cottage_in_Macetown_Queenstown_196e80fd-60ba-4f36-96c0-590bd578cde9.jpg",
    alt: "Queenstown in autumn with golden leaves",
  },
  {
    name: "Winter",
    months: "June - August",
    image:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=700&fit=crop",
    alt: "Snow-covered mountains in Queenstown winter",
  },
  {
    name: "Spring",
    months: "September - November",
    image:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1390,y_798/v1/clients/queenstownnz/Paradise_Ziplines_Please_use_SouthernWay_where_possible_5704037b-c6b5-47f4-9f70-bfe79ab644bf.jpg",
    alt: "Queenstown spring blooms",
  },
];

export default function SeasonsSection() {
  return (
    <section className="bg-cream py-20 px-8 md:px-20 lg:px-24">
      <div className="container-wide">
        <h2 className="text-3xl md:text-4xl font-bold text-teal tracking-widest-custom uppercase leading-tight">
          Queenstown Through the Seasons
        </h2>
        <p className="text-body mt-4 max-w-3xl leading-relaxed">
          One of the great things about Queenstown, is its ability to transform
          with the seasons. From our winter wonderland and blooming spring, to
          golden autumn hues and lake-side summers, there&apos;s always a good
          time to visit Queenstown.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {SEASONS.map((season) => (
            <a
              key={season.name}
              href={`/seasons/${season.name.toLowerCase()}`}
              className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={season.image}
                alt={season.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-lg font-bold tracking-widest-custom uppercase italic">
                  {season.name}
                </h3>
                <p className="text-white/80 text-sm mt-1">{season.months}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
