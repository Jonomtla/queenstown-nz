import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Plan Your Trip",
    links: [
      { label: "Things To Do", href: "/things-to-do/" },
      { label: "Accommodation", href: "/accommodation/" },
      { label: "Eat & Drink", href: "/places-to-eat-and-drink/" },
      { label: "Travel Tips", href: "/plan/travel-tips/" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Community Hub", href: "/community/" },
      { label: "Golf Hub", href: "/community/hubs/golf/" },
      { label: "Collections", href: "/community/collections/best-for-toddlers/" },
      { label: "Contributors", href: "/community/contributors/" },
      { label: "My Trip", href: "/community/saved/" },
    ],
  },
  {
    heading: "Destination Queenstown",
    links: [
      { label: "About Us", href: "https://www.queenstownnz.co.nz/about-us/" },
      { label: "Inspiration", href: "/stories/" },
      { label: "Arrowtown", href: "/plan/surrounding-region/arrowtown/" },
      { label: "Glenorchy", href: "/plan/surrounding-region/glenorchy/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-cream py-16 px-8 md:px-20 lg:px-24 border-t border-gray-200">
      <div className="container-wide grid md:grid-cols-4 gap-10">
        {FOOTER_LINKS.map((section) => (
          <div key={section.heading}>
            <h4 className="font-bold text-teal tracking-widest-custom uppercase text-sm mb-4">
              {section.heading}
            </h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body/70 text-sm hover:text-teal transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-body/70 text-sm hover:text-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Logo + Contact */}
        <div className="flex flex-col items-start md:items-end">
          <Image
            src="https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/queenstownnz-redesign/header_logo_white_372153b6-19b8-4c5a-a471-e1a3a18d3f8c.png"
            alt="Queenstown New Zealand logo"
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
            Official website of Queenstown NZ
            <br />
            &copy; 2026 Destination Queenstown
          </p>
        </div>
      </div>

      {/* Partner logos */}
      <div className="container-wide mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-8">
        {["100% Pure New Zealand", "Southern Scenic Route", "Central Otago Touring Route", "Love Queenstown"].map((partner) => (
          <span key={partner} className="text-gray-400 text-xs font-bold tracking-widest-custom uppercase">
            {partner}
          </span>
        ))}
      </div>
    </footer>
  );
}
