import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';

const metrics = [
  { value: '52K+', label: 'Meals served' },
  { value: '9K+', label: 'Children educated' },
  { value: '28', label: 'Partner communities' },
  { value: '120+', label: 'Events held' },
];

export default function ImpactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-forest-light to-cloud pt-24" id="main-content">
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 grid gap-16 lg:grid-cols-[1fr_1fr] items-center">
            <div>
              <span className="section-tag">Impact</span>
              <h1 className="font-serif text-5xl text-soil-dark mb-5">The Difference We Make Together</h1>
              <p className="text-stone text-lg leading-relaxed mb-8">
                Our work stretches across India, from schoolrooms to senior kitchens. See the impact created
                by communities supporting communities.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-3xl bg-white/90 p-6 shadow-forest">
                    <p className="font-serif text-4xl text-forest-mid mb-2">{metric.value}</p>
                    <p className="text-sm text-soil-dark">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative h-[480px] w-full bg-gradient-to-br from-sun-warm/30 to-sun-gold/30">
              <Image
                src="https://media.istockphoto.com/id/508497052/photo/unity-of-indian-children-asia.jpg?s=612x612&w=0&k=20&c=kG5rMa8k0HngLbT5CcgJaXA_wu2ufHoVwSLrj--YVQs="
                alt="Group of volunteers celebrating community service"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 to-transparent" />
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              <article className="card p-8">
                <h2 className="font-serif text-2xl text-soil-dark mb-4">Feeding Families</h2>
                <p className="text-stone leading-relaxed">
                  Our meal programs support families across urban and rural India, providing nourishment with
                  dignity and local ingredients.
                </p>
              </article>
              <article className="card p-8">
                <h2 className="font-serif text-2xl text-soil-dark mb-4">Education & Training</h2>
                <p className="text-stone leading-relaxed">
                  Children gain the skills they need for school and life, with learning centers designed to
                  celebrate local culture and language.
                </p>
              </article>
              <article className="card p-8">
                <h2 className="font-serif text-2xl text-soil-dark mb-4">Health & Wellness</h2>
                <p className="text-stone leading-relaxed">
                  Health camps, nutrition checks, and hygiene awareness create safer, stronger communities.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
