import { createClient } from '@/lib/supabase/server';

export interface Program {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  parent_slug: string | null;
  image_urls: string[];
  year_breakdown: Record<string, string[]> | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getPrograms(): Promise<Program[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching programs:', error);
    return [];
  }

  return data || [];
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching program:', error);
    return null;
  }

  return data;
}

export async function getSubPrograms(parentSlug: string): Promise<Program[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('parent_slug', parentSlug)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching sub-programs:', error);
    return [];
  }

  return data || [];
}