'use client';

import { useEffect, useRef, useState } from 'react';
import { Utensils, Home, GraduationCap, Users } from 'lucide-react';

const stats = [
  { icon: Utensils,       number: 50000, label: 'Meals Served Monthly',  suffix: '' },
  { icon: Home,           number: 25,    label: 'Partner Orphanages',     suffix: '+' },
  { icon: GraduationCap, number: 500,   label: 'Children in School',     suffix: '+' },
  { icon: Users,          number: 120,   label: 'Active Volunteers',      suffix: '+' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref   = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 25);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-serif text-4xl font-bold text-soil-dark block">
      {count.toLocaleString()}
      {count === target ? suffix : ''}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-cloud relative" aria-label="Impact statistics">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-mid via-sun-gold to-forest-mid" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, number, label, suffix }) => (
            <div
              key={label}
              className="card p-10 text-center border-b-4 border-forest-mid group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-leaf-pale rounded-2xl text-forest-mid mb-5 group-hover:bg-forest-mid group-hover:text-white transition-all duration-300">
                <Icon size={28} />
              </div>
              <AnimatedNumber target={number} suffix={suffix} />
              <p className="text-stone font-medium mt-2 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}