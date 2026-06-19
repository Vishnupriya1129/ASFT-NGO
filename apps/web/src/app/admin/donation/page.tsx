'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface DonationSettings {
  id?: string;
  upi_id: string;
  account_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  qr_image_url: string;
  phone: string;
  email: string;
}

export default function DonationSettingsPage() {
  const [settings, setSettings] = useState<DonationSettings>({
    upi_id: '',
    account_name: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    qr_image_url: '',
    phone: '',
    email: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const { data, error } = await supabase
      .from('donation_settings')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error('Load error:', error);
      return;
    }

    if (data) {
      setSettings(data);
    }
  }

  async function saveSettings() {
    setSaving(true);
    console.log('SAVING...', settings);

    // 1. Find existing record
    const { data: existing, error: existingError } = await supabase
      .from('donation_settings')
      .select('id');

    if (existingError) {
      console.error('Select error:', existingError);
      alert('Error checking settings. Check console.');
      setSaving(false);
      return;
    }

    let error = null;

    if (existing && existing.length > 0) {
      // Update
      const { error: updateError } = await supabase
        .from('donation_settings')
        .update(settings)
        .eq('id', existing[0].id);

      error = updateError;
      if (error) console.error('Update error:', error);
      else console.log('Updated successfully');
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('donation_settings')
        .insert([settings]);

      error = insertError;
      if (error) console.error('Insert error:', error);
      else console.log('Inserted successfully');
    }

    if (error) {
      alert('Failed to save. Check console for details.');
    } else {
      alert('Settings saved to Supabase!');
    }

    setSaving(false);
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Donation Settings CMS</h1>

      <div className="space-y-4">
        <input
          className="border p-3 w-full"
          placeholder="UPI ID"
          value={settings.upi_id}
          onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
        />
        <input
          className="border p-3 w-full"
          placeholder="Account Name"
          value={settings.account_name}
          onChange={(e) => setSettings({ ...settings, account_name: e.target.value })}
        />
        <input
          className="border p-3 w-full"
          placeholder="Bank Name"
          value={settings.bank_name}
          onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
        />
        <input
          className="border p-3 w-full"
          placeholder="Account Number"
          value={settings.account_number}
          onChange={(e) => setSettings({ ...settings, account_number: e.target.value })}
        />
        <input
          className="border p-3 w-full"
          placeholder="IFSC Code"
          value={settings.ifsc_code}
          onChange={(e) => setSettings({ ...settings, ifsc_code: e.target.value })}
        />
        <input
          className="border p-3 w-full"
          placeholder="QR Image URL"
          value={settings.qr_image_url}
          onChange={(e) => setSettings({ ...settings, qr_image_url: e.target.value })}
        />
        <input
          className="border p-3 w-full"
          placeholder="Phone"
          value={settings.phone}
          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
        />
        <input
          className="border p-3 w-full"
          placeholder="Email"
          value={settings.email}
          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
        />

        <button
          onClick={saveSettings}
          disabled={saving}
          className="bg-green-600 text-white px-6 py-3 rounded disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Donation Settings'}
        </button>
      </div>
    </div>
  );
}