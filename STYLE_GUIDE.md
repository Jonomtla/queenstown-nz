# Queenstown NZ Community Platform — Style Guide & Architecture Reference

> Comprehensive reference for all future development on this project. Covers design system, component patterns, class library, UI/UX audit findings, and comparison with the official queenstownnz.co.nz site.

---

## Table of Contents

1. [Design System](#design-system)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Class Library](#component-class-library)
6. [Page Templates](#page-templates)
7. [Icon System](#icon-system)
8. [Responsive Breakpoints](#responsive-breakpoints)
9. [UI/UX Audit — Current Issues](#uiux-audit--current-issues)
10. [Comparison: Our Site vs Official QT Site](#comparison-our-site-vs-official-qt-site)
11. [Recommendations](#recommendations)
12. [File Architecture](#file-architecture)

---

## Design System

### Tech Stack
- **Framework:** Next.js 16.1.6 (App Router, static generation via `generateStaticParams`)
- **Styling:** Tailwind CSS 4 (config in `globals.css` via `@theme inline`, no `tailwind.config.ts`)
- **Fonts:** Google Fonts — Carlito (400, 700)
- **Images:** `next/image` with `unoptimized` prop (Unsplash + Simpleview CDN)
- **Deployment:** Vercel (static export)

### Design Principles
- Clean, premium but approachable — not corporate
- Generous whitespace, cream backgrounds, teal as anchor color
- Uppercase tracking-wide headings for section labels and navigation
- Cards with rounded corners (2xl), subtle hover shadows
- Data visualisation using inline bar charts, not heavy chart libraries

---

## Color Palette

### Brand Colors (defined in `globals.css`)

| Name | Variable | Hex | Usage |
|------|----------|-----|-------|
| Teal | `--color-teal` | `#004157` | Primary — headings, links, CTAs, nav, icons |
| Teal Dark | `--color-teal-dark` | `#003244` | Header bg, deep emphasis |
| Teal Light | `--color-teal-light` | `#005a7a` | Hover states on teal text |
| Light Blue | `--color-light-blue` | `#91b5be` | Decorative accents (rarely used currently) |
| Cream | `--color-cream` | `#f4ece1` | Page backgrounds, card backgrounds, sections |
| Cream Dark | `--color-cream-dark` | `#ede7dd` | Not currently used — available for depth |
| Copper | `--color-copper` | `#c86128` | Secondary accent — badges, endorsements, seasonal labels, "New" badges |
| Body | `--color-body` | `#3f3939` | Default body text color |

### Gray Scale

| Class | Hex | Common Usage |
|-------|-----|-------------|
| `gray-100` | `#f5f5f5` | Filter button inactive bg |
| `gray-200` | `#e5e5e5` | Borders, dividers |
| `gray-300` | `#d4d4d4` | Timeline dots, subtle separators |
| `gray-400` | `#a3a3a3` | Meta text (dates, counts), placeholder text |
| `gray-500` | `#737373` | Secondary body text, descriptions |
| `gray-600` | `#525252` | Card body text, segment descriptions |
| `gray-700` | `#404040` | Emphasized secondary text |

### Semantic Colors (not in theme, used directly)

| Usage | Tailwind Classes | Notes |
|-------|-----------------|-------|
| Success / Eco | `bg-green-100 text-green-700` | Eco tags, stewardship cards, "Usually quiet" |
| Warning / Moderate | `bg-amber-100 text-amber-700` | Moderate crowd, mid-range budget |
| Danger / High crowd | `bg-orange-100 text-orange-700` | High crowd, busy periods |
| Extreme / Alert | `bg-red-100 text-red-700` | Extreme crowd levels |
| Info / Cool | `bg-blue-50 text-blue-600` | Rainy day alternatives, indoor setting |
| Save / Heart | `text-red-400` / `text-red-500` | Saved items, heart icons |

### Known Issue: Teal Overuse
Teal is used for headings, links, CTAs, icons, badges, chart highlights, sidebar labels. This dilutes visual hierarchy. **Recommendation:** Reserve teal for interactive elements (links, buttons, icons). Use `text-body` or `text-gray-700` for section headings that aren't clickable.

### Known Issue: Official QT Site Uses Orange
The official site uses `#c86128` (orange-brown) for hover states and CTAs. Our `copper` (`#c86128`) is close but slightly different. Consider aligning to `#c86128` for consistency if this is meant to match the official brand.

---

## Typography

### Font Stack
```css
--font-sans: "Carlito", "Segoe UI", sans-serif;
--font-heading: "Carlito", "Segoe UI", sans-serif;
--font-serif: Georgia, "Publico Text", "Times New Roman", serif;
```

**Note:** The official QT site uses "Carnac Bold" for display headings and "Publico Text Semibold Italic" for decorative subheadings. We don't have access to Carnac (proprietary). Carlito is the closest open-source match.

### Heading Hierarchy

| Level | Classes | Example |
|-------|---------|---------|
| Page Title (Hero) | `text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-widest-custom uppercase` | "Community", "Golf in Queenstown" |
| Section Title | `text-xl md:text-2xl font-bold text-teal tracking-widest-custom uppercase` | "Course Directory", "Related Itineraries" |
| Card Title | `text-lg font-bold text-teal` | Itinerary/course names |
| Sidebar Heading | `text-sm font-bold tracking-widest-custom uppercase text-teal` | "Golf Conditions", "Top Contributors" |
| Label / Tag | `text-[10px] font-semibold tracking-widest-custom uppercase` | Category pills, badges, meta labels |

### Body Text

| Usage | Classes |
|-------|---------|
| Primary body | `text-body` (inherits from body CSS) at 16px |
| Card description | `text-gray-600 text-sm leading-relaxed` |
| Long-form text | `text-body text-lg leading-relaxed` |
| Meta / timestamp | `text-xs text-gray-400` |
| Micro label | `text-[10px] text-gray-400 tracking-widest-custom uppercase` |

### Custom Utility: `tracking-widest-custom`
```css
.tracking-widest-custom { letter-spacing: 0.15em; }
```
Used on ALL uppercase labels, headings, badges, and navigation items. This is a signature visual element of the design — every uppercase element should use it.

**Note:** The official QT site uses `0.11em` to `0.13em` letter-spacing. Our `0.2em` is significantly wider — more stylised. This is intentional for a community platform feel vs the official corporate site.

---

## Spacing System

### Page-Level Padding
```
px-8 md:px-20 lg:px-24
```
Used consistently across ALL sections. Do not deviate.

### Section Vertical Padding
| Context | Classes |
|---------|---------|
| Content section | `py-12` |
| Hero section | (no padding — uses absolute positioning) |
| Breadcrumb row | `py-4` |
| Footer | `py-16` |
| Related sections (bottom) | `py-16` |

### Container
```css
.container-wide { max-width: 1568px; margin-left: auto; margin-right: auto; }
```
Applied inside every section's padding wrapper. Match the official QT site's `--width-base: 1568px`.

### Card / Component Gaps
| Context | Classes |
|---------|---------|
| Card grid | `gap-6` (24px) or `gap-8` (32px) |
| Sidebar widgets | `space-y-8` (32px between widgets) |
| Internal card padding | `p-5` (20px) or `p-6` (24px) |
| Badge/tag gaps | `gap-1.5` (6px) or `gap-2` (8px) |

### Content Grid Layout
```
grid lg:grid-cols-[1fr_340px] gap-12
```
Used for feed + sidebar (community page) and main + sidebar (golf hub).

---

## Component Class Library

### Cards

**Standard Content Card (Itinerary/Recommendation)**
```
rounded-2xl overflow-hidden bg-cream hover:shadow-lg transition-shadow
```
- Image: `relative h-[220px]` with `object-cover group-hover:scale-105 transition-transform duration-500`
- Content area: `p-5`

**Sidebar Widget Card**
```
bg-cream rounded-xl p-6
```

**Interactive Info Card (expandable)**
```
bg-cream rounded-2xl overflow-hidden hover:shadow-lg transition-shadow
```

**Alert / Highlight Card (stewardship, local tip)**
```
bg-copper/5 border border-copper/20 rounded-xl p-4     (local tip)
bg-green-50 border border-green-200 rounded-xl p-4     (stewardship)
bg-teal/5 border border-teal/20 rounded-xl p-4         (operator note)
bg-gray-50 border border-gray-200 rounded-xl p-4       (crowd pressure)
```

### Buttons

**Primary CTA (pill)**
```
border border-teal rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest-custom uppercase text-teal hover:bg-teal hover:text-white transition-colors
```

**Active/Filled State**
```
bg-teal text-white rounded-full px-6 py-2.5 text-xs font-semibold tracking-widest-custom uppercase
```

**Filter Button (inactive)**
```
bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full px-4 py-2 text-xs font-semibold tracking-widest-custom uppercase transition-colors whitespace-nowrap
```

**Filter Button (active)**
```
bg-teal text-white rounded-full px-4 py-2 text-xs font-semibold tracking-widest-custom uppercase
```

**Ghost/Text Button**
```
text-xs font-semibold tracking-widest-custom uppercase text-teal hover:text-teal-light transition-colors
```

### Badges / Pills

**Category Badge (on card image)**
```
bg-white/90 text-teal text-[10px] font-semibold tracking-widest-custom uppercase px-2.5 py-1 rounded-full
```

**Hero Badge (on dark bg)**
```
bg-white/20 text-white text-[10px] font-semibold tracking-widest-custom uppercase px-3 py-1 rounded-full backdrop-blur-sm
```

**Status Badge (crowd level, budget, eco)**
```
text-[10px] font-semibold tracking-widest-custom uppercase px-2 py-0.5 rounded-full ${bg} ${color}
```
Where bg/color comes from the semantic color table above.

**Contributor Type Badge**
```
Local:   bg-teal/10 text-teal
Visitor: bg-copper/10 text-copper
Creator: bg-copper/10 text-copper (same as visitor currently)
```

### Hero Sections

**Standard Hero**
```html
<section className="relative h-[50vh] w-full">
  <Image fill className="object-cover" priority unoptimized />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
  <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 lg:px-24 pb-12">
    <!-- Content here -->
  </div>
</section>
```

**Taller Hero (hub pages)**
```
h-[50vh] md:h-[60vh]
```

### Breadcrumbs
```html
<div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
  <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
    <Link href="/" className="hover:text-teal">Home</Link>
    <span>/</span>
    ...
  </nav>
</div>
```

### Bar Charts (crowd/busyness)

**12-month mini chart**
```
flex items-end gap-[3px] h-12
```
Each bar:
```
flex-1 rounded-t-sm transition-all ${colorByValue}
style={{ height: `${Math.max(value * 4.5, 2)}px` }}
```
Month labels below:
```
text-[8px] text-gray-400 (current month: text-teal font-bold)
```

Bar color function:
```
value <= 3: bg-green-400
value <= 6: bg-amber-400
value <= 8: bg-orange-400
value > 8:  bg-red-400
```

### Links

**Inline text link**
```
text-teal hover:text-teal-light transition-colors
```

**Place link (with pin icon)**
```
text-xs font-semibold tracking-widest-custom uppercase text-teal hover:text-teal-light transition-colors
```

**Footer link**
```
text-teal/70 text-sm hover:text-teal transition-colors
```

---

## Page Templates

### 1. Community Feed (`/community/`)
```
PageLayout > CommunityHero > Breadcrumbs > Section(white) > Grid[Feed | Sidebar]
```
- Feed: ContributeBar > SeasonalBanner > TripMatcher > FilterBar > Card Grid
- Sidebar: DestinationBusyness > SeasonalDepth > StayLongerProof > SavedItems > Collections > TopContributors > Events
- Mobile: Sidebar widgets interleaved into feed at positions 3, 7, 11

### 2. Itinerary Detail (`/community/[slug]/`)
```
PageLayout > Hero > Breadcrumbs > Section(white) > Max-w-4xl Content
```
- Content: AuthorHeader > Summary > Photos > CostEstimator > Map > CrowdSummary > DayBreakdown > BonusDay > PackingList > UserStories > ActionButtons > Comments

### 3. Hub Page (`/community/hubs/golf/`)
```
PageLayout > Hero(tall) > Breadcrumbs > Section(white) > Grid[Main | Sidebar]
```
- Main: CourseDirectory > ItineraryIdeas > CommunityTips
- Sidebar: GolfSeasonality > GolfStayLonger > QuickLinks > MoreHubs
- Mobile: Seasonality widget shown above courses (lg:hidden on sidebar, shown inline)

### 4. Category Page (`/things-to-do/[...slug]/`)
```
PageLayout > CategoryTemplate(Hero > Breadcrumbs > Intro > ListingGrid > CommunityStrip)
```

### 5. Listing Detail (`/listing/[slug]/[id]/`)
```
PageLayout > ListingTemplate(Hero > Breadcrumbs > Content > Sidebar)
```

---

## Icon System

No icon library installed. All icons are inline SVG via Heroicons paths stored as string constants.

**Common pattern:**
```tsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="..." />
</svg>
```

**Standard icon sizes:**
- `w-3 h-3` — inside badges, micro elements
- `w-3.5 h-3.5` — place links, small indicators
- `w-4 h-4` — standard inline icons, sidebar headings
- `w-5 h-5` — prominent icons, hero stats, ContributeBar
- `w-8 h-8` / `w-10 h-10` — icon circles (e.g. section headers with bg circles)

**Icon circle pattern:**
```
w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center
```

**Recommendation:** Consider installing `@heroicons/react` or creating an `Icon` component to avoid duplicated SVG paths across 30+ files.

---

## Responsive Breakpoints

Tailwind defaults apply:
| Prefix | Min-width | Usage |
|--------|-----------|-------|
| (none) | 0px | Mobile-first base |
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets — 2-column grids start |
| `lg` | 1024px | Desktop — sidebar appears, mobile widgets hide |
| `xl` | 1280px | Wide desktop |

**Key responsive patterns:**
- Sidebar: `hidden lg:block` (desktop only)
- Card grid: `grid md:grid-cols-2` (stacks on mobile)
- Mobile sidebar widgets: `lg:hidden` (hidden on desktop)
- Page padding: `px-8 md:px-20 lg:px-24`
- Hero text: `text-3xl md:text-5xl lg:text-6xl`
- Content max-width: `max-w-4xl` (itinerary detail), `max-w-3xl` (saved page)

---

## UI/UX Audit — Current Issues

### Critical

1. **Teal overuse** — headings, links, icons, badges, chart highlights all use teal. Makes it hard to distinguish interactive from decorative elements. Differentiate: teal for clickable, gray-700/body for non-interactive headings.

2. **No search** — community page has 15 itineraries + 24 recommendations but no search. As content grows this will be a major pain point.

3. **Image inconsistency** — mix of high-quality Simpleview CDN images and Unsplash stock creates uneven quality. Golf hub courses especially have generic stock mixed with real venue photos.

4. **Footer links are all `href="#"`** — non-functional. Needs real routing or removal.

5. **Accessibility gaps:**
   - Color-only crowd level differentiation (needs text + color)
   - Some SVG icons missing `aria-label` or `aria-hidden`
   - `text-[10px]` on badges may be below WCAG minimum (12px recommended)
   - Cream bg (`#f4ece1`) against `text-gray-500` (`#737373`) contrast ratio: ~3.8:1 — fails WCAG AA (needs 4.5:1)

### Moderate

6. **Card information density** — itinerary cards show: image, 2 category badges, photo count, contributor badge, traveller type, budget level, duration, eco tag, age badge, title, summary, endorsement, reactions, save, comment count. That's 14+ data points on one card. Consider progressive disclosure.

7. **Filter bar pills run off-screen on mobile** — the horizontal scroll is functional but not discoverable. No visual indicator that more filters exist off-screen.

8. **No loading/empty states designed** — when filters return 0 results there's a plain text message. No illustration, no suggestion to broaden filters.

9. **Reactions still slightly confusing** — "Helpful" and "Been here" are clearer than the original 3, but the numbers next to them don't have context (helpful to whom? been here when?).

10. **No image alt text specificity** — most images have `alt={title}` which is the page/card title, not a description of the image content. Poor for screen readers.

### Minor

11. **Inconsistent border radius** — cards use `rounded-2xl` (16px), sidebar widgets use `rounded-xl` (12px), badges use `rounded-full`. This is intentional hierarchy but could be documented.

12. **No dark mode support** — not critical for a tourism site, but worth noting.

13. **Print stylesheet missing** — visitors often print itineraries. No `@media print` considerations.

14. **Google Fonts loaded via `<link>` tag** — should use `next/font/google` for better performance (no layout shift, preloading).

15. **`unoptimized` on all images** — bypasses Next.js image optimization. Fine for external URLs but means no automatic WebP conversion or responsive srcset.

---

## Comparison: Our Site vs Official QT Site

### What the Official Site Does Better

| Area | Official Site | Our Site | Gap |
|------|--------------|----------|-----|
| **Typography** | Carnac Bold (display) + Publico Text Italic (decorative) + Carlito (body) = 3-tier hierarchy | Carlito only = flat hierarchy | Missing display font creates less visual distinction between hero text and body |
| **Hero treatment** | Aspect-ratio responsive (2304x1110 desktop), gradient to black at bottom, white accent underline below title | Fixed `h-[50vh]`, gradient overlay, no underline | Official heroes feel more cinematic |
| **Card hover** | Scale 1.05x + overlay fade + shadow lift | Scale 1.05x + shadow lift | Missing overlay fade on hover |
| **Button design** | Pill buttons with `px-[72px]` generous padding, clear primary/secondary distinction | Pill buttons with `px-6`, primary only | Our buttons feel smaller and less confident |
| **Color warmth** | Cream bg `#f4ece1` (warmer), orange `#c86128` as accent | Cream `#f4ece1` (cooler), copper `#c86128` | Our palette is slightly colder |
| **Tripbuilder** | Heart icon save system with counter in nav header | Heart save with floating bar | Official version is more integrated into the navigation |
| **Megamenu** | 3-column dropdowns with smooth transitions | Single-column dropdowns | Official nav feels more premium |
| **Letter-spacing** | `0.11-0.13em` on uppercase | `0.2em` on uppercase | Ours is noticeably wider — stylised but less "official" |
| **Image treatment** | Real photography from Simpleview CMS, consistent quality | Mix of Unsplash stock + Simpleview | Quality inconsistency |

### What Our Site Does Better

| Area | Our Site | Official Site |
|------|----------|--------------|
| **Community features** | Full reaction system, prompted comments, contributor profiles, save-to-trip | Basic heart icon only |
| **Data intelligence** | Crowd charts, seasonal depth, busyness data, dispersal nudges | None |
| **Content structure** | Day-by-day itineraries with segments, tips, places, crowd data | Flat article format |
| **Engagement depth** | Reactions, comments, saves, contribution prompts | Static content, no interaction |
| **Interest hubs** | Golf hub with course directory, seasonal intel, operator notes | Category pages with listings only |
| **Length of stay** | BonusDay, StayLongerProof, smart SavedTripBar, trip planner | None |
| **Mobile interleaving** | Sidebar widgets flow into feed on mobile | Sidebar just disappears |

### Alignment Recommendations

To feel like an extension of the official site rather than a separate product:

1. **Warm up the cream** — shift `#f4ece1` → `#f4ece1` to match official bg
2. **Tighten letter-spacing** — consider `0.15em` as a middle ground (our `0.2em` is noticeably wider than official `0.11em`)
3. **Add overlay fade on card hover** — matches official interaction pattern
4. **Increase button padding** — our CTAs feel timid compared to official `px-[72px]`
5. **Consider adding Carnac Bold** — if DQ can provide the font files, it would instantly align the visual language. If not, a heavier weight of Carlito or a similar geometric sans could help
6. **Match copper to official orange** — `#c86128` → `#c86128` for exact brand alignment

---

## Recommendations

### Priority 1 — Quick Wins

- [x] Fix footer links (real routes) — DONE
- [x] Increase badge font size `10px` → `11px` minimum (WCAG) — DONE
- [ ] Add `aria-hidden="true"` to all decorative SVGs — partial, ongoing
- [x] Warm cream to `#f4ece1` — DONE
- [x] Align copper to official orange `#c86128` — DONE
- [x] Tighten letter-spacing `0.2em` → `0.15em` — DONE
- [x] Add overlay fade on card image hover — DONE
- [x] Switch to `next/font/google` — DONE
- [x] Add print stylesheet — DONE
- [x] Filter bar scroll fade indicator — DONE
- [x] Proper empty state for zero filter results — DONE

### Priority 2 — UX Improvements

- [ ] Add search to community page (client-side fuzzy search on titles/categories)
- [ ] Reduce card information density — hide budget level, age range, endorsement count behind hover or detail view
- [ ] Add scroll indicators on filter bar (fade gradient at right edge on mobile)
- [ ] Design proper empty state with illustration for zero filter results
- [ ] Add "skeleton" loading states for dynamic components (reactions, saves)

### Priority 3 — Design System

- [ ] Create shared `Icon` component wrapping common SVG paths
- [ ] Extract all color/spacing tokens into a design tokens file for reference
- [ ] Add `@media print` stylesheet for itinerary pages
- [ ] Consider dark mode tokens (not urgent)
- [ ] Create Storybook or component showcase page for reference

### Priority 4 — Brand Alignment

- [ ] Obtain Carnac Bold from DQ for display headings
- [ ] Align copper → official orange `#c86128`
- [ ] Reduce letter-spacing to `0.15em`
- [ ] Add white accent underline to hero titles (official site pattern)
- [ ] Increase primary button padding to match official proportions

---

## File Architecture

```
src/
├── app/
│   ├── layout.tsx                              # Root layout (font, analytics)
│   ├── page.tsx                                # Homepage
│   ├── globals.css                             # Theme tokens, base styles, utilities
│   ├── community/
│   │   ├── page.tsx                            # Community feed
│   │   ├── [slug]/page.tsx                     # Itinerary detail
│   │   ├── category/[tag]/page.tsx             # Filtered by tag
│   │   ├── collections/[slug]/page.tsx         # Collection page
│   │   ├── contributors/page.tsx               # All contributors
│   │   ├── contributors/[slug]/page.tsx        # Contributor profile
│   │   ├── saved/page.tsx                      # Saved trip planner
│   │   └── hubs/
│   │       └── golf/page.tsx                   # Golf hub
│   ├── things-to-do/[[...slug]]/page.tsx       # Category pages
│   ├── accommodation/[[...slug]]/page.tsx
│   ├── places-to-eat-and-drink/[[...slug]]/page.tsx
│   ├── plan/[[...slug]]/page.tsx
│   ├── listing/[slug]/[id]/page.tsx            # Listing detail
│   ├── stories/page.tsx                        # Blog index
│   └── stories/post/[slug]/page.tsx            # Blog post
├── components/
│   ├── Header.tsx                              # Sticky nav with dropdowns
│   ├── Footer.tsx                              # 4-column footer
│   ├── templates/
│   │   ├── PageLayout.tsx                      # Header + main + Footer wrapper
│   │   ├── CategoryTemplate.tsx                # Category page template
│   │   ├── ListingTemplate.tsx                 # Listing detail template
│   │   └── StoryTemplate.tsx                   # Blog post template
│   ├── community/                              # 30+ community components
│   │   ├── CommunityFeed.tsx                   # Main feed with filters + interleaved widgets
│   │   ├── CommunityFilterBar.tsx              # Category/sort filter pills
│   │   ├── CommunityHero.tsx                   # Community page hero
│   │   ├── CommunitySidebar.tsx                # Desktop sidebar
│   │   ├── ContributeBar.tsx                   # Facebook-style contribution prompt
│   │   ├── ItineraryCard.tsx                   # Feed card
│   │   ├── RecommendationCard.tsx              # Feed card with modal
│   │   ├── ReactionButtons.tsx                 # Helpful / Been here
│   │   ├── SaveButton.tsx                      # Heart save + useSavedItems hook
│   │   ├── SavedTripBar.tsx                    # Mobile floating trip bar
│   │   ├── CommentSection.tsx                  # Prompted commenting
│   │   ├── ItineraryDayBreakdown.tsx           # Day-by-day segments + crowd charts
│   │   ├── CrowdSummary.tsx                    # Aggregate crowd overview
│   │   ├── DestinationBusyness.tsx             # 12-month busyness chart
│   │   ├── SeasonalDepth.tsx                   # Season-exclusive experiences
│   │   ├── StayLongerProof.tsx                 # Social proof widget
│   │   ├── BonusDay.tsx                        # "If you had one more day..."
│   │   ├── QuickSharePrompt.tsx                # Floating share CTA
│   │   ├── ContributorBadge.tsx                # Name + avatar + type badge
│   │   ├── TripMatcher.tsx                     # Who/how long/when filters
│   │   ├── SeasonalBanner.tsx                  # Season quick-switch
│   │   ├── CommunityContentStrip.tsx           # Community content on category pages
│   │   ├── ItineraryMap.tsx                    # Route map
│   │   ├── PhotoCarousel.tsx                   # Image gallery
│   │   ├── CostEstimator.tsx                   # Budget breakdown
│   │   ├── PackingList.tsx                     # Packing checklist
│   │   ├── UserStories.tsx                     # Visitor stories
│   │   ├── ShareButtons.tsx                    # Social share
│   │   └── AdaptItinerary.tsx                  # Adaptation modal
│   └── hubs/                                   # Hub-specific components
│       ├── GolfCourseCard.tsx                  # Course listing card
│       ├── GolfSeasonality.tsx                 # Seasonal conditions widget
│       ├── GolfCommunity.tsx                   # Community tips section
│       └── GolfStayLonger.tsx                  # Stay & play nudge
├── data/                                       # Static JSON data (future: CMS)
│   ├── community-itineraries.json              # 15 itineraries
│   ├── community-recommendations.json          # 24 recommendations
│   ├── community-contributors.json             # 8 contributors
│   ├── community-collections.json              # 5 collections
│   ├── community-events.json                   # Seasonal events
│   ├── hub-golf.json                           # Golf hub data
│   ├── categories.json                         # Category hierarchy
│   ├── listings.json                           # Operator listings
│   ├── plans.json                              # Planning guides
│   └── stories.json                            # Blog posts
└── scripts/
    └── update-crowd-data.js                    # Data migration utility
```

---

## Patterns for New Hub Development

When creating a new hub (e.g., Snow, MTB, Wine, Astro):

1. **Data file:** Create `src/data/hub-{name}.json` following `hub-golf.json` schema
2. **Page:** Create `src/app/community/hubs/{name}/page.tsx`
3. **Components:** Add to `src/components/hubs/` — reuse `GolfCourseCard` pattern for listings, `GolfSeasonality` for conditions, `GolfStayLonger` for nudges
4. **Navigation:** Add link to Header.tsx community dropdown + CommunityFilterBar.tsx
5. **Data schema for any hub:**
```json
{
  "hero": { "title", "subtitle", "image", "stats": {} },
  "listings": [{ "slug", "name", "type", "location", "description", "image", "localTip", "operatorNote", "crowdPressure": {} }],
  "seasonality": { "monthly": [12 values], "conditions": { "summer|autumn|winter|spring": {} } },
  "communityTips": [{ "author", "authorType", "text", "helpful" }],
  "itineraryIdeas": [{ "title", "days": [], "bestSeason", "tip" }],
  "stayLonger": { "averageTrip", "recommendedDays", "stat", "nudge" }
}
```

---

*Last updated: February 2026*
*Maintained by: Claude Code builds, human review*
