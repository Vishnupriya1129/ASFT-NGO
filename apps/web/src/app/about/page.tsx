import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';

export default function AboutPage() {
  const coreValues = [
    {
      title: 'Youth Empowerment',
      description: 'We believe in the potential of young people to create meaningful change in their communities.',
    },
    {
      title: 'Social Responsibility',
      description: 'Active civic participation and community service are essential for shaping conscious citizens.',
    },
    {
      title: 'Character & Values',
      description: 'We nurture integrity, leadership, and moral responsibility in every individual we work with.',
    },
    {
      title: 'Skill Development',
      description: 'We equip youth with practical skills and knowledge for sustainable career growth.',
    },
    {
      title: 'Community Dignity',
      description: 'We serve with respect and empathy, maintaining the dignity of every community we partner with.',
    },
    {
      title: 'Sustainable Impact',
      description: 'Our programs are designed for long-term positive change and community resilience.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-earth-cream to-cloud pt-24" id="main-content">
        {/* Hero Section */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 grid gap-16 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-forest-light/30 to-sun-gold/30">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=700&fit=crop"
                alt="Vision and Mission of Aram Saeivom Family Trust"
                width={900}
                height={700}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white max-w-xs">
                <p className="text-sm uppercase tracking-[0.25em] text-sun-warm mb-2">About ASFT</p>
                <h2 className="font-serif text-3xl font-bold">Our Vision & Mission</h2>
              </div>
            </div>

            <div>
              <span className="section-tag">Vision & Mission</span>
              <h1 className="font-serif text-5xl text-soil-dark mb-5">Aram Saeivom Family Trust</h1>
              <p className="text-stone text-lg leading-relaxed mb-8">
                Since 2016, we have been dedicated to educating and empowering the younger generation through meaningful social service initiatives. Our mission is to create opportunities where students and youth can engage in community service while developing essential life values and leadership qualities.
              </p>
              <div className="space-y-4 mb-8 text-stone">
                <p>• Nurturing character, values, and leadership in young people.</p>
                <p>• Building socially conscious and self-motivated individuals.</p>
                <p>• Enhancing career skills through practical experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Organization History Section */}
        <section className="py-24 bg-white/50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="section-tag">Our Story</span>
              <h2 className="font-serif text-4xl text-soil-dark mb-4 mt-4">Organization History</h2>
              <p className="text-stone text-lg">Established in 2016 with a shared vision of making a difference</p>
            </div>
            
            <div className="bg-gradient-to-r from-forest-light/10 to-sky-light/10 rounded-2xl p-12 border border-forest-light/20">
              <p className="text-stone text-lg leading-relaxed">
                Aram Saeivom Family Trust (ASFT) was established in 2016 by a group of college students with a shared vision of educating and empowering the younger generation through meaningful social service initiatives. ASFT was founded with the objective of creating a platform where students and youth can actively engage in community service while developing essential life values and leadership qualities. Through various field activities, training initiatives, educational programs, and outdoor explorations, the organization strives to nurture character, values, skills, and social responsibility among young individuals. ASFT strongly believes that social responsibility plays a vital role in shaping disciplined, self-motivated, and socially conscious youth. By encouraging self-learning, self-guidance, and active civic participation, the organization aims to help young people discover their potential and enhance their career-related skills.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards Section */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="section-tag">Our Direction</span>
              <h2 className="font-serif text-4xl text-soil-dark mb-4">Mission & Vision</h2>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Mission Card */}
              <div className="bg-gradient-to-br from-sun-warm/10 to-sun-warm/5 rounded-2xl p-10 border border-sun-warm/20 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-sun-warm rounded-full flex items-center justify-center text-2xl font-serif font-bold text-white mb-4">
                    M
                  </div>
                  <h3 className="font-serif text-3xl text-soil-dark">Our Mission</h3>
                </div>
                <p className="text-stone text-lg leading-relaxed">
                  To provide platforms for youth to engage in diverse civic activities that nurture character, values, skills, and social responsibility.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-gradient-to-br from-forest-light/10 to-forest-light/5 rounded-2xl p-10 border border-forest-light/20 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-forest-light rounded-full flex items-center justify-center text-2xl font-serif font-bold text-white mb-4">
                    V
                  </div>
                  <h3 className="font-serif text-3xl text-soil-dark">Our Vision</h3>
                </div>
                <p className="text-stone text-lg leading-relaxed">
                  A generation of young people empowered to serve their communities with leadership, confidence, and a deep sense of social responsibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 bg-gradient-to-b from-white/50 to-earth-cream/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="section-tag">Our Foundation</span>
              <h2 className="font-serif text-4xl text-soil-dark mb-4">Core Values</h2>
              <p className="text-stone text-lg max-w-2xl mx-auto">These values guide every decision we make and shape the character of the young leaders we nurture.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-stone/10"
                >
                  <h3 className="font-serif text-2xl text-soil-dark mb-3">{value.title}</h3>
                  <p className="text-stone leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-serif text-4xl text-soil-dark mb-6">Join Our Movement</h2>
            <p className="text-stone text-lg mb-8 leading-relaxed">
              Be part of a community dedicated to empowering the next generation. Whether as a volunteer, donor, or supporter, your contribution matters.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/volunteer" className="btn-primary">
                Become a Volunteer
              </a>
              <a href="/#donate" className="btn-secondary">
                Support Our Work
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
