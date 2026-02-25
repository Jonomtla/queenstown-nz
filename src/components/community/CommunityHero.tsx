import Image from "next/image";

export default function CommunityHero({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="relative h-[50vh] w-full">
      <Image
        src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=2400&h=800&fit=crop"
        alt="Community stories from Queenstown"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 lg:px-24 pb-12">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-widest-custom uppercase max-w-3xl leading-tight">
          {title || "Community"}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-lg mt-4 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
