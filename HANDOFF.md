# Queenstown NZ Replica — Handoff Doc for Claude Code

## What's Been Done

### 1. Project Scaffolded & Deployed
- **Repo:** https://github.com/Jonomtla/queenstown-nz
- **Live URL:** https://queenstown-nz-rose.vercel.app
- **Stack:** Next.js 16 + TypeScript + Tailwind CSS v4
- **Deployed to:** Vercel (auto-deploys on push to main)
- **Working directory:** `/Users/jonomatla/Claude/queenstown-nz/`

### 2. Homepage Built (needs fixes)
The homepage has all sections but has issues:
- **Broken images** — Some image URLs use fabricated IDs (I couldn't scrape all exact URLs from the dynamically-loaded site). The Simpleview CDN URLs need the exact image ID hash. Working images include the hero, some category cards, and some listing images.
- **Visual polish needed** — Spacing, font sizing, and colour matching needs tuning vs the original at https://www.queenstownnz.co.nz/

### 3. Homepage Components (all in `/src/components/`)
- `Header.tsx` — Sticky teal header with nav dropdowns, mobile menu, search, favourites
- `Hero.tsx` — Full-screen hero with "WELCOME TO QUEENSTOWN" heading
- `IntroSection.tsx` — Intro text + breadcrumb
- `CategoryCards.tsx` — Tabbed carousel (Things To Do / Eat & Drink / Accommodation)
- `CarbonZeroBanner.tsx` — Full-width CTA banner
- `TripIdeas.tsx` — Itinerary cards carousel
- `FortyYearsBanner.tsx` — 40 Years of DQ banner
- `EventsSection.tsx` — Featured event + sidebar events
- `SeasonsSection.tsx` — 4 season cards
- `FaqSection.tsx` — Accordion FAQ (7 questions)
- `RegionsSection.tsx` — Surrounding regions with SVG map
- `StoriesSection.tsx` — Featured story + story cards carousel
- `InstagramGrid.tsx` — 8-image grid
- `Newsletter.tsx` — Email signup + social icons
- `Footer.tsx` — 4-column footer with partner logos

### 4. GA4 Data Pulled
Top pages by pageviews (Dec 2025 - Feb 2026) saved. Here are the priorities:

## What Needs To Be Built

### Phase 1: Fix Homepage
1. Fix broken image URLs — use placeholder images from Unsplash or find correct Simpleview URLs by scraping the actual pages in Chrome
2. Match colours more closely: primary teal is `#004157`, copper accent is `#c67a3c`, cream background is `#f7f3ed`
3. Fix font — the original uses Carlito for headings and Carnac for serif/italic headings. Use Google Fonts or similar fallbacks.

### Phase 2: Page Templates (4 templates needed)

#### A. Category Page Template (`/src/app/[...slug]/page.tsx` or similar)
Used for: /things-to-do/, /accommodation/, /restaurants/, /walking-and-hiking/, etc.
Layout:
- Hero image with category title overlay
- Intro paragraph
- Grid of listing cards (3-4 per row on desktop)
- Each card: image, title, short description, location, "Read More" button, heart icon
- No pagination needed for MVP

#### B. Listing/Detail Page Template
Used for: /listing/queenstown-hill-time-walk/2039/, /listing/skyline-queenstown/1056/, etc.
Layout:
- Image gallery/hero at top
- Title + category badge
- Main description (2-3 paragraphs)
- Sidebar with: address, phone, website link, opening hours
- Key details (duration, difficulty, etc for walks; cuisine type for restaurants)
- Map placeholder
- Related listings at bottom

#### C. Story/Blog Page Template
Used for: /stories/post/10-things-to-do-in-summer/, etc.
Layout:
- Hero image
- "Stories" breadcrumb
- Title (large italic serif)
- Author: "Queenstown, NZ" + read time
- Social share buttons
- Body text with images interspersed
- Related stories at bottom

#### D. Event Page Template
Used for: /event/queenstown-new-years-eve-fireworks/2589/, etc.
Layout:
- Hero image
- Date badge
- Title + details
- Description
- Venue/location info

### Phase 3: Top Pages to Create (from GA4 data)

#### Top Category/Index Pages (~25 pages)
Create these as category pages with listing card grids:

| Path | Pageviews | Type |
|------|-----------|------|
| /things-to-do/ | 25,630 | Category index |
| /accommodation/ | 22,004 | Category index |
| /things-to-do/outdoor-activities/walking-and-hiking/ | 19,443 | Sub-category |
| /things-to-do/events/ | 17,833 | Category |
| /things-to-do/events/event-calendar/ | 15,336 | Event listing |
| /places-to-eat-and-drink/ | 14,941 | Category index |
| /places-to-eat-and-drink/restaurants/ | 12,432 | Sub-category |
| /things-to-do/outdoor-activities/walking-and-hiking/short-walks/ | 9,429 | Sub-sub-category |
| /things-to-do/adventure-activities/ | 9,090 | Sub-category |
| /things-to-do/biking/ | 7,963 | Sub-category |
| /things-to-do/family-fun/ | 7,449 | Sub-category |
| /things-to-do/biking/bike-hire/ | 6,516 | Sub-sub-category |
| /things-to-do/outdoor-activities/walking-and-hiking/day-walks/ | 6,443 | Sub-sub-category |
| /accommodation/hotels-and-resorts/ | 5,416 | Sub-category |
| /things-to-do/shopping/ | 5,260 | Sub-category |
| /accommodation/serviced-apartments/ | 5,180 | Sub-category |
| /things-to-do/skiing-and-snowboarding/ | 4,966 | Sub-category |
| /things-to-do/skiing-and-snowboarding/ski-fields/ | 4,805 | Sub-category |
| /things-to-do/adventure-activities/bungy-swing-and-zip/ | 4,654 | Sub-sub-category |
| /things-to-do/golf/golf-courses/ | 4,651 | Sub-sub-category |
| /things-to-do/adventure-activities/indoor-thrills/ | 4,614 | Sub-sub-category |
| /places-to-eat-and-drink/cafes-and-bakeries/ | 4,135 | Sub-category |
| /accommodation/lodges-and-retreats/ | 4,077 | Sub-category |
| /accommodation/motels/ | 3,689 | Sub-category |
| /places-to-eat-and-drink/pubs-bars-and-clubs/ | 3,629 | Sub-category |

#### Top Listing Pages (~20 pages)
Create these as individual listing detail pages:

| Path | Pageviews | Type |
|------|-----------|------|
| /listing/queenstown-hill-time-walk/2039/ | 4,875 | Walk |
| /listing/bobs-cove-track-&-nature-walk/9103/ | 4,646 | Walk |
| /listing/tiki-trail/9099/ | 4,295 | Walk |
| /listing/lower-wye-creek-track/1489/ | 4,134 | Walk |
| /listing/glenorchy-lagoon-walkway/9102/ | 3,937 | Walk |
| /listing/queenstown-gardens-trail/9100/ | 3,623 | Walk |
| /listing/ritchies-transport/3250/ | 3,556 | Transport |
| /listing/mount-crichton-loop-track/16153/ | 3,340 | Walk |
| /listing/realnz/1255/ | 2,803 | Activity provider |
| /listing/ben-lomond-track/9114/ | 2,479 | Walk |
| /listing/lake-hayes-loop-track/12465/ | 2,402 | Walk |
| /listing/moke-lake-loop-track/2043/ | 2,377 | Walk |
| /listing/sawpit-gully-trail/2040/ | 2,370 | Walk |
| /listing/skyline-queenstown/1056/ | 2,073 | Attraction |
| /listing/frankton-golf-centre/2021/ | 1,969 | Golf |
| /listing/arrowtown-river-trail/9098/ | 1,960 | Walk |

#### Top Story/Blog Pages (~10 pages)
Create these as blog posts with example content:

| Path | Pageviews |
|------|-----------|
| /stories/post/10-things-to-do-in-summer/ | 6,755 |
| /stories/post/6-day-queenstown-slow-travel-itinerary/ | 6,247 |
| /stories/post/a-locals-guide-to-the-queenstown-markets/ | 5,539 |
| /stories/post/adventurous-accommodation-in-and-around-queenstown/ | 4,454 |
| /stories/post/top-things-to-do-in-autumn/ | 4,275 |
| /stories/post/how-to-explore-queenstown-by-2-public-bus/ | 4,202 |

#### Top General Pages (~8 pages)

| Path | Pageviews |
|------|-----------|
| /plan/ | 3,080 |
| /plan/travel-tips/ | 5,875 |
| /plan/surrounding-region/glenorchy/ | 3,045 |
| /plan/surrounding-region/arrowtown/ | 2,787 |
| /plan/queenstown-maps-and-visitor-guides/ | 2,978 |
| /plan/getting-here-and-getting-around/ | 2,809 |
| /plan/itineraries/ | 2,102 |
| /stories/ | 2,246 |

### Phase 4: Data Approach
The most efficient way to build all these pages:

1. **Create JSON data files** in `/src/data/`:
   - `categories.json` — all category pages with title, description, hero image, child listings
   - `listings.json` — all listing pages with title, description, images, details, contact info
   - `stories.json` — all blog posts with title, hero image, author, read time, body content
   - `events.json` — event data

2. **Use Next.js dynamic routes:**
   - `/src/app/things-to-do/[...slug]/page.tsx` — category pages
   - `/src/app/accommodation/[...slug]/page.tsx` — accommodation category pages
   - `/src/app/places-to-eat-and-drink/[...slug]/page.tsx` — food category pages
   - `/src/app/listing/[slug]/[id]/page.tsx` — listing detail pages
   - `/src/app/stories/post/[slug]/page.tsx` — blog pages
   - `/src/app/event/[slug]/[id]/page.tsx` — event pages
   - `/src/app/plan/[...slug]/page.tsx` — plan pages

3. **For images:** Use real Simpleview CDN URLs where available. For missing ones, use Unsplash placeholder images of Queenstown. The CDN URL pattern is:
   `https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,g_xy_center,h_{HEIGHT},q_65,w_{WIDTH}/v1/clients/queenstownnz/{IMAGE_ID}.jpg`

### Phase 5: Polish
- Fix all broken images on homepage
- Ensure all nav links point to real pages
- Add breadcrumbs to all inner pages
- Consistent header/footer across all pages
- Mobile responsive check
- Deploy final version

## Key Design Tokens
```
Primary teal: #004157
Teal dark: #003244
Teal light: #005a7a
Copper/orange: #c67a3c
Cream background: #f7f3ed
Cream dark: #ede7dd
```

## Important Notes
- Do NOT add GA4 tracking to this site — it shares the same GA4 property as the live site
- All commits should go to a feature branch, not main directly (per CLAUDE.md version control rules)
- The Vercel deployment auto-deploys from GitHub on push
- The original site is built on Simpleview CMS — our replica is static Next.js
- Dynamic content (listings loaded via API) on the original means WebFetch can't scrape listing cards — you may need to use Chrome browser automation or create placeholder content
