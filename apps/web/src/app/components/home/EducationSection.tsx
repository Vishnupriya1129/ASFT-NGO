'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Laptop, Palette, HeartPulse, School, HandHeart } from 'lucide-react';

const features = [
  { icon: BookOpen,  text: 'Free primary and secondary education with qualified teachers' },
  { icon: Laptop,    text: 'Computer literacy and digital skills for the modern world' },
  { icon: Palette,   text: 'Arts, crafts, and vocational training for self-reliance' },
  { icon: HeartPulse, text: 'Healthcare checkups and nutrition support for every child' },
];

export function EducationSection() {
  return (
    <section
      id="education"
      className="py-24 bg-gradient-to-b from-earth-cream to-cloud relative overflow-hidden"
      aria-label="Education initiative"
    >
      {/* Decorative background */}
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-forest-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Main image */}
          <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-forest-light/30 to-sun-gold/30">
            <Image
              src="https://www.sriharsha.in/wp-content/uploads/2022/09/IMG_8242-1800x1200.jpg"
              alt="Rural Indian classroom where children sit on the floor learning"
              width={700}
              height={350}
              className="object-cover w-full h-[300px]"
              loading="lazy"
            />
            {/* Badge */}
            <div className="absolute bottom-[-16px] right-5 bg-gradient-to-br from-forest-mid to-forest-light text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-forest flex items-center gap-2">
              <School size={16} />
              500+ Students Enrolled
            </div>
          </div>

          {/* Small images */}
          <div className="relative rounded-xl overflow-hidden shadow-lg mt-4 bg-gradient-to-br from-sun-warm/30 to-sun-gold/30">
            <Image
              src="https://volunteersindia.org/images/teaching-volunteer.jpg"
              alt="Volunteer teaching children in a community classroom"
              width={300}
              height={180}
              className="object-cover w-full h-[160px]"
              loading="lazy"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg mt-4 bg-gradient-to-br from-forest-light/30 to-leaf-pale/30">
            <Image
              src="https://as1.ftcdn.net/v2/jpg/01/85/50/42/1000_F_185504238_yhaEvCsfCArD2vUliLxGerlNZLrl5FSt.jpg"
              alt="Children learning letters on a blackboard"
              width={300}
              height={180}
              className="object-cover w-full h-[160px]"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">
            <BookOpen size={14} /> Education Initiative
          </span>
          <h2 className="font-serif text-5xl text-soil-dark mb-6">
            Seed School of Hope
          </h2>
          <p className="text-stone text-lg leading-relaxed mb-8">
            In the soil of poverty, we plant the seeds of education. Our school provides free,
            quality learning to children from economically disadvantaged backgrounds — because
            every child deserves to grow.
          </p>

          <ul className="space-y-5 mb-10" role="list">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4 font-medium text-charcoal">
                <div className="w-10 h-10 bg-gradient-to-br from-forest-mid to-forest-light rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <Icon size={17} />
                </div>
                <span className="text-sm">{text}</span>
              </li>
            ))}
          </ul>

          <Link href="/#donate" className="btn-primary">
            <HandHeart size={18} />
            Support Our School
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
