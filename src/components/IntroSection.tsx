export default function IntroSection() {
  return (
    <section className="bg-white pt-8 pb-16 px-8 md:px-20 lg:px-24">
      {/* Breadcrumb */}
      <div className="container-wide text-sm text-gray-400 mb-10">
        <span>Home</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start container-wide">
        <h2 className="text-[28px] md:text-[35px] font-bold italic font-serif text-teal leading-snug">
          Ready to delve deeper? Your Queenstown adventure starts here.
        </h2>
        <div className="text-body leading-relaxed space-y-4 text-[18px]">
          <p>
            Nestled amidst New Zealand&apos;s spectacular alpine landscapes,
            Queenstown is home to a vibrant community that welcomes you as a
            temporary local. Wake within stunning surrounds, discover your
            perfect adventure, and take a tour of our world-class food and wine
            scene.
          </p>
          <p>
            Come on in, take a look around and start planning your escape to
            Queenstown.
          </p>
        </div>
      </div>
    </section>
  );
}
