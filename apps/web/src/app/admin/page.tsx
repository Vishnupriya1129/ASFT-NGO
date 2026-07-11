'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import {
  Image,
  Megaphone,
  Calendar,
  Heart,
  BarChart3,
  Settings,
  Home,
} from 'lucide-react';

const cards = [
  { title: 'Hero Section', description: 'Manage homepage hero images and content', href: '/admin/hero', icon: Home },
  { title: 'Announcements', description: 'Manage latest announcements', href: '/admin/announcements', icon: Megaphone },
  { title: 'Gallery', description: 'Manage gallery images', href: '/admin/gallery', icon: Image },
  { title: 'Events', description: 'Manage events', href: '/admin/events', icon: Calendar },
  { title: 'Donation', description: 'Donation settings', href: '/admin/donation', icon: Heart },
  { title: 'Statistics', description: 'Homepage statistics', href: '/admin/stats', icon: BarChart3 },
  { title: 'Settings', description: 'Website settings', href: '/admin/settings', icon: Settings },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // No session – redirect to login
        window.location.href = '/admin/login';
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold text-primary-500">Aram Saeivom CMS</h1>
            <p className="text-gray-600 mt-1">Manage your website content from one place.</p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Sign Out
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <Icon className="w-10 h-10 text-primary-500 mb-4" />
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="text-gray-500 mt-2">{card.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}