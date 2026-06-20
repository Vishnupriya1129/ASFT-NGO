'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [value, setValue] = useState('');
  const [label, setLabel] = useState('');
  const [stats, setStats] = useState<any[]>([]);

  async function loadStats() {
    if (!supabase) {
      console.error('Supabase is not configured');
      return;
    }

    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setStats(data || []);
  }

  async function addStat() {
    if (!supabase) {
      console.error('Supabase is not configured');
      return;
    }

    const { error } = await supabase
      .from('stats')
      .insert([
        {
          value,
          label,
          display_order: stats.length + 1,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setValue('');
    setLabel('');

    loadStats();
  }

  async function deleteStat(id: number) {
    if (!supabase) {
      console.error('Supabase is not configured');
      return;
    }

    await supabase
      .from('stats')
      .delete()
      .eq('id', id);

    loadStats();
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Hero Statistics CMS</h1>

      <div className="space-y-4 max-w-lg">
        <input
          className="border p-3 w-full"
          placeholder="Value (50K+)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Label (Meals/Month)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <button
          onClick={addStat}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Add Statistic
        </button>
      </div>

      <div className="mt-10 space-y-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-bold text-xl">{item.value}</div>
              <div className="text-gray-600">{item.label}</div>
            </div>

            <button
              onClick={() => deleteStat(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}