import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      <Image
        src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_1110,q_65,w_2304,x_910,y_290/v1/clients/queenstownnz/Queenstown_from_above_4e4570ab-65b5-4daa-9ead-5f6735b21d51.jpg"
        alt="Aerial view overlooking Queenstown"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 lg:px-24">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight max-w-2xl">
          WELCOME TO
          <br />
          QUEENSTOWN
        </h1>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-12 h-12 rounded-full border-2 border-white/60 flex items-center justify-center animate-bounce">
          <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
