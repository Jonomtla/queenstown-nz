import Image from "next/image";

export default function CarbonZeroBanner() {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_800,q_65,w_2304,x_2000,y_1500/v1/clients/queenstownnz/Biking_lakeside_Queenstown_carbon_zero_abcdef12-3456-7890-abcd-ef0123456789.jpg"
        alt="Couple relaxing by the lake with bikes"
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold italic font-serif leading-tight max-w-3xl">
          Join our journey to a carbon zero future
        </h2>
        <p className="text-white/90 mt-6 max-w-2xl text-lg leading-relaxed">
          We&apos;re on a mission to keep this place special. That means working
          together to create a carbon zero visitor economy by 2030, and we need
          your help to make it happen.
        </p>
        <a
          href="/regenerative-tourism"
          className="mt-8 bg-white text-gray-800 font-semibold tracking-widest-custom uppercase text-sm px-10 py-4 rounded-full hover:bg-gray-100 transition-colors"
        >
          Join Us
        </a>
      </div>
    </section>
  );
}
