import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-cream py-16 px-8 md:px-20 lg:px-24 border-t border-gray-200">
      <div className="container-wide grid md:grid-cols-4 gap-10">
        {/* Plan Your Trip */}
        <div>
          <h4 className="font-bold text-teal tracking-widest-custom uppercase text-sm mb-4">
            Plan Your Trip
          </h4>
          <ul className="space-y-2">
            {["Things To Do", "Accommodation", "Eat & Drink", "Events"].map(
              (link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-teal/70 text-sm hover:text-teal transition-colors"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Industry */}
        <div>
          <h4 className="font-bold text-teal tracking-widest-custom uppercase text-sm mb-4">
            Industry
          </h4>
          <ul className="space-y-2">
            {["Business Events", "Travel Trade", "Media"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-teal/70 text-sm hover:text-teal transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Destination Queenstown */}
        <div>
          <h4 className="font-bold text-teal tracking-widest-custom uppercase text-sm mb-4">
            Destination Queenstown
          </h4>
          <ul className="space-y-2">
            {[
              "About Us",
              "Insights & Stats",
              "Image Gallery",
              "Privacy Policy",
              "DQ Membership",
              "Regenerative Tourism by 2030",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-teal/70 text-sm hover:text-teal transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo + Contact */}
        <div className="flex flex-col items-start md:items-end">
          <Image
            src="https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/queenstownnz-redesign/header_logo_white_372153b6-19b8-4c5a-a471-e1a3a18d3f8c.png"
            alt="Queenstown New Zealand"
            width={120}
            height={80}
            className="h-20 w-auto brightness-0 opacity-70"
          />
          <div className="mt-4 text-sm text-gray-500 md:text-right space-y-1">
            <p>PO Box 353 (DX ZX10313)</p>
            <p>Queenstown, New Zealand</p>
            <p className="mt-2">Phone: +64 3 441 0700</p>
          </div>
          <p className="mt-6 text-xs text-gray-400 md:text-right">
            Made by Simpleview
          </p>
          <p className="mt-2 text-xs text-gray-400 md:text-right">
            Official website of Queenstown NZ
            <br />
            &copy;Copyright 2026 Destination Queenstown
          </p>
        </div>
      </div>

      {/* Partner logos */}
      <div className="container-wide mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-8">
        <span className="text-gray-400 text-xs font-bold tracking-wider">
          100% PURE NEW ZEALAND
        </span>
        <span className="text-gray-400 text-xs font-bold tracking-wider">
          SOUTHERN SCENIC ROUTE
        </span>
        <span className="text-gray-400 text-xs font-bold tracking-wider">
          CENTRAL OTAGO TOURING ROUTE
        </span>
        <span className="text-gray-400 text-xs font-bold tracking-wider">
          LOVE QUEENSTOWN
        </span>
      </div>
    </footer>
  );
}
