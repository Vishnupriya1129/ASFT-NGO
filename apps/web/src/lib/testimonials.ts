import { createClient } from '@/lib/supabase/server';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching testimonial:', error);
    return null;
  }

  return data;
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();

  if (error) {
    console.error('Error creating testimonial:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateTestimonial(id: number, updates: Partial<Testimonial>) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating testimonial:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteTestimonial(id: number) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    return { error };
  }

  return { error: null };
}