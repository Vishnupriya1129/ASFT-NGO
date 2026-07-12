import { createClient } from '@/lib/supabase/server';

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  image_urls: string[];
  details: string[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getTimeline(): Promise<TimelineItem[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('timeline')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching timeline:', error);
    return [];
  }

  return data || [];
}

export async function getTimelineItem(id: number): Promise<TimelineItem | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('timeline')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching timeline item:', error);
    return null;
  }

  return data;
}

// ✅ For admin panel - get all items including inactive
export async function getAllTimelineItems(): Promise<TimelineItem[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('timeline')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching all timeline items:', error);
    return [];
  }

  return data || [];
}

// ✅ Admin functions
export async function createTimelineItem(item: Omit<TimelineItem, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('timeline')
    .insert([item])
    .select()
    .single();

  if (error) {
    console.error('Error creating timeline item:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateTimelineItem(id: number, updates: Partial<TimelineItem>) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('timeline')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating timeline item:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteTimelineItem(id: number) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('timeline')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting timeline item:', error);
    return { error };
  }

  return { error: null };
}