import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';

const events = [
  {
    title: 'Community Kitchen Drive',
    date: 'June 12, 2026',
    location: 'South India',
    description: 'A large meal distribution event serving 2,000 families with hot lunch boxes and fresh water.',
    image: 'https://media.assettype.com/TNIE/import/2020/3/30/original/u_.jpg?w=1200&ar=40:21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100',
  },
  {
    title: 'Village School Festival',
    date: 'July 5, 2026',
    location: 'Rural South India',
    description: 'A day of crafts, storytelling, and learning resources for rural students and teachers.',
    image: 'https://i.ytimg.com/vi/PGKWXnpHx5U/maxresdefault.jpg',
  },
  {
    title: 'Health Camp for Elders',
    date: 'August 18, 2026',
    location: 'South India',
    description: 'Free medical checkups, nutrition counseling, and wellness kits for senior citizens.',
    image: 'https://mountlotus.lk/wp-content/uploads/2023/04/Image-3.jpg',
  },
];

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-cloud to-earth-cream pt-24" id="main-content">
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="section-tag">Events</span>
            <h1 className="font-serif text-5xl text-soil-dark mb-5">Join Our Next Community Events</h1>
            <p className="text-stone text-lg max-w-3xl mx-auto">
              Help us bring hope, meals, and learning to more communities with hands-on events across India.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-3 pb-24">
          {events.map((event) => (
            <article key={event.title} className="card overflow-hidden shadow-xl">
              <div className="relative h-56 w-full bg-gradient-to-t from-soil-dark/80 to-transparent overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil-dark/80 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-sm text-forest-mid font-semibold uppercase tracking-[0.2em] mb-3">{event.date}</p>
                <h2 className="font-serif text-2xl text-soil-dark mb-3">{event.title}</h2>
                <p className="text-stone mb-4">{event.description}</p>
                <p className="text-sm text-stone/80">Location: {event.location}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
