'use client';

import { useEffect, useState } from 'react';

export function ShootingStars() {
  const [stars, setStars] = useState<{ id: number; left: string; top: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 4 + 6}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    // 👈 Changed zIndex to 1 so it sits above the background but below text
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-[4px] h-[4px] bg-[#C9A227] rounded-full opacity-0"
          style={{
            left: star.left,
            top: star.top,
            animation: `shoot ${star.duration} linear ${star.delay} infinite`,
            boxShadow: '0 0 8px 2px rgba(201, 162, 39, 0.6)', 
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(-200px) translateY(200px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}