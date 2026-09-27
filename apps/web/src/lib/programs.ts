import { createClient } from '@/lib/supabase/server';

export interface YearBreakdown {
  title?: string;
  summary?: string;
  details?: string[];
  location?: string;
  impact?: string;
}

export type YearBreakdownData = YearBreakdown | string | string[];

export interface Program {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  parent_slug: string | null;
  image_urls: string[];
  year_breakdown: Record<string, YearBreakdownData> | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProgramTreeNode extends Program {
  children: ProgramTreeNode[];
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

/**
 * ✅ Build the full tree — root programs with nested sub-programs
 * Used by the Navbar mega menu
 */
export async function getProgramTree(): Promise<ProgramTreeNode[]> {
  const all = await getPrograms();
  
  const byId = new Map<string, ProgramTreeNode>();
  all.forEach((p) => byId.set(p.slug, { ...p, children: [] }));

  const roots: ProgramTreeNode[] = [];
  byId.forEach((node) => {
    if (node.parent_slug) {
      const parent = byId.get(node.parent_slug);
      if (parent) parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}