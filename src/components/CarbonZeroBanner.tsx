import Image from "next/image";

export default function CarbonZeroBanner() {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=2400&h=1000&fit=crop"
        alt="Couple relaxing by the lake with bikes"
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <h2 className="text-[28px] md:text-[48px] lg:text-[56px] text-white font-bold italic font-serif leading-[1.15] max-w-3xl">
          Join our journey to a carbon zero future
        </h2>
        <p className="text-white/90 mt-6 max-w-2xl text-lg leading-relaxed font-sans">
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
