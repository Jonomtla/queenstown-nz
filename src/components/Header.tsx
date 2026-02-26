"use client";
import { useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  {
    label: "Plan",
    href: "/plan/",
    children: [
      { label: "Getting Here & Around", href: "/plan/getting-here-and-getting-around/" },
      { label: "Maps & Visitor Guide", href: "/plan/queenstown-maps-and-visitor-guides/" },
      { label: "Travel Tips", href: "/plan/travel-tips/" },
      { label: "Itineraries", href: "/plan/itineraries/" },
      { label: "Arrowtown", href: "/plan/surrounding-region/arrowtown/" },
      { label: "Glenorchy", href: "/plan/surrounding-region/glenorchy/" },
    ],
  },
  {
    label: "Things To Do",
    href: "/things-to-do/",
    children: [
      { label: "Adventure Activities", href: "/things-to-do/adventure-activities/" },
      { label: "Bungy, Swing & Zip", href: "/things-to-do/adventure-activities/bungy-swing-and-zip/" },
      { label: "Walking & Hiking", href: "/things-to-do/outdoor-activities/walking-and-hiking/" },
      { label: "Biking", href: "/things-to-do/biking/" },
      { label: "Skiing & Snowboarding", href: "/things-to-do/skiing-and-snowboarding/" },
      { label: "Family Fun", href: "/things-to-do/family-fun/" },
      { label: "Events", href: "/things-to-do/events/" },
      { label: "Golf", href: "/things-to-do/golf/golf-courses/" },
      { label: "Shopping", href: "/things-to-do/shopping/" },
      { label: "Indoor Thrills", href: "/things-to-do/adventure-activities/indoor-thrills/" },
    ],
  },
  {
    label: "Accommodation",
    href: "/accommodation/",
    children: [
      { label: "Hotels & Resorts", href: "/accommodation/hotels-and-resorts/" },
      { label: "Serviced Apartments", href: "/accommodation/serviced-apartments/" },
      { label: "Lodges & Retreats", href: "/accommodation/lodges-and-retreats/" },
      { label: "Motels", href: "/accommodation/motels/" },
    ],
  },
  {
    label: "Eat & Drink",
    href: "/places-to-eat-and-drink/",
    children: [
      { label: "Restaurants", href: "/places-to-eat-and-drink/restaurants/" },
      { label: "Cafes & Bakeries", href: "/places-to-eat-and-drink/cafes-and-bakeries/" },
      { label: "Pubs, Bars & Clubs", href: "/places-to-eat-and-drink/pubs-bars-and-clubs/" },
    ],
  },
  { label: "Inspiration", href: "/stories/", children: [] },
  {
    label: "Community",
    href: "/community/",
    children: [
      { label: "All Itineraries", href: "/community/" },
      { label: "Collections", href: "/community/collections/best-for-toddlers/" },
      { label: "Winter Guide", href: "/community/category/winter/" },
      { label: "Family", href: "/community/category/family/" },
      { label: "Dining Guide", href: "/community/category/dining/" },
      { label: "Golf Hub", href: "/community/hubs/golf/" },
    ],
  },
];

const SECONDARY_LINKS = [
  { label: "Meet", href: "/meet" },
  { label: "Live", href: "/live" },
  { label: "Business", href: "/business" },
  { label: "Study", href: "/study" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-teal">
      {/* Secondary nav */}
      <div className="hidden lg:flex justify-end px-8 py-1 text-xs tracking-widest-custom text-white/80">
        {SECONDARY_LINKS.map((link, i) => (
          <span key={link.label}>
            {i > 0 && <span className="mx-2">|</span>}
            <a href={link.href} className="hover:text-white transition-colors">
              {link.label.toUpperCase()}
            </a>
          </span>
        ))}
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-3">
        {/* Logo */}
        <a href="/" className="shrink-0">
          <Image
            src="https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/queenstownnz-redesign/header_logo_white_372153b6-19b8-4c5a-a471-e1a3a18d3f8c.png"
            alt="Queenstown New Zealand"
            width={100}
            height={66}
            className="h-14 w-auto"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className="text-white text-sm font-semibold tracking-widest-custom uppercase hover:opacity-80 transition-opacity flex items-center gap-1"
              >
                {item.label}
                {item.children.length > 0 && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>

              {/* Dropdown */}
              {activeDropdown === item.label && item.children.length > 0 && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-6 min-w-[250px] grid grid-cols-2 gap-2">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="text-gray-700 text-sm hover:text-teal transition-colors py-1"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button className="text-white hover:opacity-80 transition-opacity hidden lg:block">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Favourites */}
          <a
            href="/tripbuilder"
            className="hidden lg:flex items-center gap-2 border border-white/40 rounded-full px-5 py-2 text-white text-xs font-semibold tracking-widest-custom uppercase hover:bg-white/10 transition-colors"
          >
            Favourites
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </a>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-teal border-t border-white/10 px-6 py-4 max-h-[80vh] overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="border-b border-white/10">
              <a
                href={item.href}
                className="block text-white text-sm font-semibold tracking-wider uppercase py-3"
              >
                {item.label}
              </a>
              {item.children.length > 0 && (
                <div className="pb-3 pl-4 flex flex-col gap-2">
                  {item.children.map((child) => (
                    <a key={child.label} href={child.href} className="text-white/70 text-xs uppercase tracking-wider hover:text-white">
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
            {SECONDARY_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="text-white/70 text-xs uppercase tracking-wider">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
