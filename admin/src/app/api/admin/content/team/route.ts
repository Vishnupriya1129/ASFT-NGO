import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('team_members').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    if (!body.name || !body.role) return NextResponse.json({ error: 'Name and role required' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from('team_members')
      .insert([{
        name: body.name,
        role: body.role,
        bio: body.bio || null,
        image_url: body.image_url || null,
        linkedin_url: body.linkedin_url || null,
        years: body.years ? parseFloat(body.years) : 0,
        is_founder: body.is_founder ?? false,
        testimonial: body.testimonial || null,
        sort_order: body.sort_order ? parseInt(body.sort_order) : 0,
        is_active: body.is_active ?? true,
      }])
      .select().single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}