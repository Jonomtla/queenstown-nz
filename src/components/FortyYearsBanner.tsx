import Image from "next/image";

export default function FortyYearsBanner() {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_800,q_65,w_2304,x_1500,y_1000/v1/clients/queenstownnz/Queenstown_Remarkables_panorama_golden_hour_12345678-abcd-1234-abcd-123456789abc.jpg"
        alt="The Remarkables mountain range at golden hour"
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold italic font-serif leading-tight max-w-3xl">
          40 Years of Destination Queenstown
        </h2>
        <p className="text-white/90 mt-6 max-w-2xl text-lg leading-relaxed">
          In 2025, Destination Queenstown marks 40 years as the region&apos;s
          official tourism organisation &mdash; four decades of sharing our place
          with the world and championing the people, experiences, and landscapes
          that make it extraordinary.
        </p>
        <a
          href="/about"
          className="mt-8 bg-white text-gray-800 font-semibold tracking-widest-custom uppercase text-sm px-10 py-4 rounded-full hover:bg-gray-100 transition-colors"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
