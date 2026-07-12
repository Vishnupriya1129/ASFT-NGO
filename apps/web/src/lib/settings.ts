// src/lib/settings.ts
import { createClient } from '@/lib/supabase/server'  // 👈 import the server client

let settingsCache: any = null;

export async function getSettings() {
  if (settingsCache) return settingsCache;

  const supabase = createClient();  // 👈 instantiate it
  const { data, error } = await supabase
    .from('settings')
    .select('*');

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }

  settingsCache = data;
  return data;
}