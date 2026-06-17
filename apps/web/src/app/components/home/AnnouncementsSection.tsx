'use client';

const announcements = [
  { badge: 'new',   icon: 'fa-user-plus',           text: 'Recruitment starts 02 May 2026 — Join our team of changemakers' },
  { badge: null,    icon: 'fa-hand-holding-heart',   text: 'Donate meals this summer — Rs 1,000 feeds 10 children for a week' },
  { badge: null,    icon: 'fa-graduation-cap',       text: 'Seed School admissions open for 2026-27 academic year' },
  { badge: 'event', icon: 'fa-calendar-star',        text: 'Annual Fundraiser Gala — 15 June 2026 at Bangalore' },
  { badge: null,    icon: 'fa-users',                text: 'Volunteer registration open — Be the change you want to see' },
  { badge: null,    icon: 'fa-award',                text: 'Arram Seivom Family Trust recognized among Top 10 NGOs in Karnataka' },
];

const doubled = [...announcements, ...announcements];

export function AnnouncementsSection() {
  return (
    <section
      className="py-16 bg-gradient-to-b from-soil-dark to-soil-mid relative overflow-hidden"
      aria-label="Latest announcements"
    >
      {/* Subtle leaf texture */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
  backgroundImage:
    "url('https://media.istockphoto.com/id/1290692045/photo/the-concept-of-unity-cooperation-teamwork-and-charity.webp?b=1&s=170667a&w=0&k=20&c=ED6Bvhds6oE8epOJKYXhF2ABxjD56-qamRnGWL9S1tU=')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}}
      />

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="font-serif text-3xl font-bold text-sun-warm mb-2">
          <i className="fas fa-bullhorn mr-3" aria-hidden="true" />
          Latest from the Field
        </h2>
        <p className="text-white/60 text-sm">
          Stay updated with our ongoing missions, events, and calls for support
        </p>
      </div>

      {/* Scrolling track */}
      <div className="overflow-hidden max-w-7xl mx-auto relative z-10">
        <div className="announcements-track">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 mx-4 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl text-white font-medium text-sm whitespace-nowrap hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {item.badge === 'new' && <span className="badge-new">New</span>}
              {item.badge === 'event' && <span className="badge-event">Event</span>}
              <i className={`fas ${item.icon} text-sun-warm text-base`} aria-hidden="true" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}