'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const supabase = createClient();

interface DonationSettings {
  id: number;
  upi_id: string;
  account_name: string;
  account_number: string;
  ifsc_code: string;
  bank_name: string;
  email: string;
}

export default function AdminDonation() {
  const router = useRouter();
  const [settings, setSettings] = useState<DonationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      .from('donation_settings')
      .select('*')
      .limit(1)
      .single();
    if (data) setSettings(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      upi_id: formData.get('upi_id') as string,
      account_name: formData.get('account_name') as string,
      account_number: formData.get('account_number') as string,
      ifsc_code: formData.get('ifsc_code') as string,
      bank_name: formData.get('bank_name') as string,
      email: formData.get('email') as string,
    };

    if (settings?.id) {
      await supabase.from('donation_settings').update(data).eq('id', settings.id);
    } else {
      await supabase.from('donation_settings').insert(data);
    }
    setSaving(false);
    loadSettings();
    alert('Donation settings saved!');
  };

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-primary-500 mb-6">Donation Settings</h1>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">UPI ID</label>
            <input
              name="upi_id"
              defaultValue={settings?.upi_id || ''}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Account Name</label>
            <input
              name="account_name"
              defaultValue={settings?.account_name || ''}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Account Number</label>
            <input
              name="account_number"
              defaultValue={settings?.account_number || ''}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">IFSC Code</label>
            <input
              name="ifsc_code"
              defaultValue={settings?.ifsc_code || ''}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bank Name</label>
            <input
              name="bank_name"
              defaultValue={settings?.bank_name || ''}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              defaultValue={settings?.email || ''}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Donation Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}
