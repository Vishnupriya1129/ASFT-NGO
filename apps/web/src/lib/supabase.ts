import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const supabaseAdmin =
  supabaseUrl && (supabaseServiceKey || supabaseAnonKey)
    ? createClient(
        supabaseUrl,
        (supabaseServiceKey || supabaseAnonKey)!,   // TypeScript now trusts this
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )
    : null;

// Types for CMS content
export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: Record<string, any>;
  metaDescription: string;
  featuredImage?: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CMSProgram {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  images: string[];
  order: number;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export interface CMSCampaign {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: Record<string, any>;
  goalAmount: number;
  raisedAmount: number;
  featuredImage?: string;
  images: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CMSGallery {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CMSSettings {
  id: string;
  key: string;
  value: Record<string, any>;
  description: string;
  updatedAt: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
  path: string;
}