'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface HeroContent {
  id: number;
  heading: string;
  subheading: string;
  hero_image: string;
  secondary_image: string;
  primary_button: string;
  primary_button_link: string;
  secondary_button: string;
  secondary_button_link: string;
}

export default function HeroAdminPage() {
  const [hero, setHero] = useState<HeroContent>({
    id: 1,
    heading: '',
    subheading: '',
    hero_image: '',
    secondary_image: '',
    primary_button: '',
    primary_button_link: '',
    secondary_button: '',
    secondary_button_link: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadHero();
  }, []);

  async function loadHero() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.error(error);
    }

    if (data) {
      setHero(data);
    }

    setLoading(false);
  }

  async function saveHero() {
    if (!supabase) return;

    setSaving(true);

    const { error } = await supabase
      .from('hero_content')
      .update({
        heading: hero.heading,
        subheading: hero.subheading,
        hero_image: hero.hero_image,
        secondary_image: hero.secondary_image,
        primary_button: hero.primary_button,
        primary_button_link: hero.primary_button_link,
        secondary_button: hero.secondary_button,
        secondary_button_link: hero.secondary_button_link,
      })
      .eq('id', 1);

    if (error) {
      alert('Failed to save');
      console.error(error);
    } else {
      alert('Hero updated successfully!');
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Hero Section CMS
        </h1>

        <div className="space-y-6">

          <div>
            <label className="block font-semibold mb-2">
              Heading
            </label>

            <input
              value={hero.heading}
              onChange={(e) =>
                setHero({
                  ...hero,
                  heading: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Sub Heading
            </label>

            <textarea
              rows={4}
              value={hero.subheading}
              onChange={(e) =>
                setHero({
                  ...hero,
                  subheading: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Hero Image URL
            </label>

            <input
              value={hero.hero_image}
              onChange={(e) =>
                setHero({
                  ...hero,
                  hero_image: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />

            {hero.hero_image && (
              <div className="mt-4">
                <Image
                  src={hero.hero_image}
                  alt="Hero"
                  width={350}
                  height={220}
                  className="rounded-xl border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Secondary Image URL
            </label>

            <input
              value={hero.secondary_image}
              onChange={(e) =>
                setHero({
                  ...hero,
                  secondary_image: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />

            {hero.secondary_image && (
              <div className="mt-4">
                <Image
                  src={hero.secondary_image}
                  alt="Secondary"
                  width={250}
                  height={180}
                  className="rounded-xl border"
                />
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block font-semibold mb-2">
                Primary Button
              </label>

              <input
                value={hero.primary_button}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    primary_button: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Primary Button Link
              </label>

              <input
                value={hero.primary_button_link}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    primary_button_link: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Secondary Button
              </label>

              <input
                value={hero.secondary_button}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    secondary_button: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Secondary Button Link
              </label>

              <input
                value={hero.secondary_button_link}
                onChange={(e) =>
                  setHero({
                    ...hero,
                    secondary_button_link: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

          <button
            onClick={saveHero}
            disabled={saving}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

        </div>
      </div>
    </main>
  );
}