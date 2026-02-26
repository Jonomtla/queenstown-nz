const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/community-itineraries.json', 'utf8'));

// Add ecoTag to a few itineraries
data['hiking-highlights-3-day'].ecoTag = 'DOC Conservation Partner';
data['solo-adventure-5-days'].ecoTag = 'Low-Impact Trail';
if (data['spring-wellness-retreat']) data['spring-wellness-retreat'].ecoTag = 'Eco-Certified';

// Update crowdPressure to use byMonth (12 values) instead of byHour (24 values)
function updateSegment(seg) {
  if (!seg.crowdPressure) return;
  const cp = seg.crowdPressure;

  const seasonMonths = {
    summer: [0, 1, 11],
    autumn: [2, 3, 4],
    winter: [5, 6, 7],
    spring: [8, 9, 10]
  };

  const byMonth = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  const worst = seasonMonths[cp.worstSeason] || [];
  const best = seasonMonths[cp.bestSeason] || [];

  worst.forEach(m => { byMonth[m] = cp.level === 'extreme' ? 10 : cp.level === 'high' ? 8 : 6; });
  best.forEach(m => { byMonth[m] = cp.level === 'extreme' ? 3 : cp.level === 'high' ? 2 : 1; });
  byMonth.forEach((v, i) => {
    if (!worst.includes(i) && !best.includes(i)) {
      byMonth[i] = Math.round((v + 4) / 2);
    }
  });

  cp.byMonth = byMonth;
  delete cp.byHour;
}

for (const [slug, it] of Object.entries(data)) {
  for (const day of it.days) {
    for (const seg of day.segments) {
      updateSegment(seg);
    }
  }
}

// Add dispersal nudges
function addDispersal(slug, dayIdx, segIdx, nudge) {
  if (data[slug] && data[slug].days[dayIdx] && data[slug].days[dayIdx].segments[segIdx]) {
    const seg = data[slug].days[dayIdx].segments[segIdx];
    if (seg.crowdPressure) {
      seg.crowdPressure.dispersalNudge = nudge;
    }
  }
}

addDispersal('perfect-winter-weekend', 0, 0, {
  alternative: 'The Remarkables',
  reason: 'Less crowded terrain with better off-piste — only 20 min further',
  slug: 'the-remarkables'
});

addDispersal('family-friendly-summer-week', 0, 0, {
  alternative: 'Moke Lake Track',
  reason: 'A fraction of the crowds with equally stunning lake views',
  slug: 'moke-lake-hidden-gem'
});

addDispersal('family-friendly-summer-week', 2, 0, {
  alternative: 'Queenstown Bike Park',
  reason: 'Skip the Luge queue — the bike park has no wait and kids love it',
  slug: null
});

addDispersal('foodie-trail-queenstown', 0, 0, {
  alternative: 'Fergbaker next door',
  reason: "Same quality, zero queue — the venison pie is the locals' pick",
  slug: 'fergbaker'
});

addDispersal('foodie-trail-queenstown', 0, 2, {
  alternative: 'Rata',
  reason: "Josh Emett's place — same calibre, easier to book midweek",
  slug: 'rata'
});

addDispersal('summer-adrenaline-weekend', 0, 0, {
  alternative: 'Nevis Bungy',
  reason: '134m instead of 43m, half the crowds, twice the adrenaline',
  slug: null
});

addDispersal('summer-adrenaline-weekend', 1, 0, {
  alternative: 'Routeburn Track day walk',
  reason: 'World-class scenery with a fraction of the canyon crowds',
  slug: null
});

addDispersal('hiking-highlights-3-day', 0, 0, {
  alternative: 'Queenstown Hill Time Walk',
  reason: 'Same panoramic views, far fewer people, and only 2 hours return',
  slug: 'queenstown-hill-time-walk'
});

fs.writeFileSync('src/data/community-itineraries.json', JSON.stringify(data, null, 2) + '\n');
console.log('Done. Updated crowd data to monthly, added eco tags, added dispersal nudges.');
