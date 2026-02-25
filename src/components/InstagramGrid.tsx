import Image from "next/image";

const GRID_IMAGES = [
  {
    src: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1210,y_880/v1/clients/queenstownnz/Family_at_Queenstown_Bay_Playground_1__eef16657-1ae9-42c6-acbf-38456b437a10.jpg",
    alt: "Queenstown summer walking",
  },
  {
    src: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_3439,y_4457/v1/clients/queenstownnz/Queenstown_Golf_Club_8__4de95f71-8986-4f98-bd7d-30d79056c6db.jpg",
    alt: "Southern lights over Queenstown",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    alt: "Remarkables Market fruit",
  },
  {
    src: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_2019,y_1539/v1/clients/queenstownnz/Picnic_by_historic_cottage_in_Macetown_Queenstown_196e80fd-60ba-4f36-96c0-590bd578cde9.jpg",
    alt: "Canyon swing adventure",
  },
  {
    src: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_3212,y_1889/v1/clients/queenstownnz/Spirit_of_Queenstown_Scenic_Cruise_Southern_Discoveries_026754f4-87da-423e-a630-2a14f4b0c1cd.jpg",
    alt: "Arrowtown gold mining heritage",
  },
  {
    src: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1390,y_798/v1/clients/queenstownnz/Paradise_Ziplines_Please_use_SouthernWay_where_possible_5704037b-c6b5-47f4-9f70-bfe79ab644bf.jpg",
    alt: "Queenstown Bay beach",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop",
    alt: "Waterfront dining Queenstown",
  },
  {
    src: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_582,q_65,w_511,x_1210,y_880/v1/clients/queenstownnz/Family_at_Queenstown_Bay_Playground_1__eef16657-1ae9-42c6-acbf-38456b437a10.jpg",
    alt: "Hiking the Remarkables",
  },
];

export default function InstagramGrid() {
  return (
    <section className="bg-teal py-16">
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-1">
        {GRID_IMAGES.map((img, i) => (
          <a
            key={i}
            href="#"
            className="relative aspect-square group cursor-pointer overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          </a>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center mt-1">
        <button className="w-full bg-teal-dark text-white font-semibold tracking-wider py-3 hover:bg-teal-light transition-colors">
          Load More
        </button>
      </div>
    </section>
  );
}
