// src/lib/settings.ts
import { createClient } from '@/lib/supabase/client';  // ← Client-side

let settingsCache: any = null;

export async function getSettings() {
  if (settingsCache) return settingsCache;

  const supabase = createClient();
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