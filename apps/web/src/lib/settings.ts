import { supabase } from './supabase';

let settingsCache: Record<string, string> | null = null;

export async function getSettings() {
  if (settingsCache) return settingsCache;

  const { data, error } = await supabase
    .from('settings')
    .select('*');

  if (error) {
    console.error('Error fetching settings:', error);
    return {};
  }

  settingsCache = data.reduce((acc: Record<string, string>, setting: any) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  return settingsCache;
}