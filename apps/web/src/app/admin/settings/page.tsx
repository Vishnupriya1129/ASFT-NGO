'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Setting {
  key: string;
  value: string;
  description?: string;
}

const SETTING_KEYS = [
  { key: 'site_title', label: 'Site Title', description: 'Shown in browser tab and header' },
  { key: 'tagline', label: 'Tagline', description: 'Shown under the logo' },
  { key: 'contact_email', label: 'Contact Email', description: 'Email shown in footer' },
  { key: 'contact_phone', label: 'Contact Phone', description: 'Phone number in footer' },
  { key: 'facebook_url', label: 'Facebook URL', description: 'Social media link' },
  { key: 'instagram_url', label: 'Instagram URL', description: 'Social media link' },
  { key: 'youtube_url', label: 'YouTube URL', description: 'Social media link' },
  { key: 'linkedin_url', label: 'LinkedIn URL', description: 'Social media link' },
  { key: 'announcement_banner', label: 'Announcement Banner', description: 'Shown at top of site' },
  { key: 'default_donation', label: 'Default Donation Amount', description: 'Preselected amount (₹)' },
];

export default function AdminSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      loadSettings();
    };
    checkAuth();
  }, [router]);

  const loadSettings = async () => {
    const { data } = await supabase
      .from('settings')
      .select('*');
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((s: Setting) => map[s.key] = s.value);
      setSettings(map);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const updates = SETTING_KEYS.map(({ key }) => ({
      key,
      value: settings[key] || '',
    }));

    const { error } = await supabase
      .from('settings')
      .upsert(updates, { onConflict: 'key' });

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Settings saved!');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary-500">Settings</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {SETTING_KEYS.map(({ key, label, description }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
                <span className="text-xs text-gray-400 ml-2">({description})</span>
              </label>
              <input
                type="text"
                value={settings[key] || ''}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 mt-1"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}