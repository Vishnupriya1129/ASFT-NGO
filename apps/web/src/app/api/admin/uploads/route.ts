import { supabaseAdmin, supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

async function requireAdmin(req: Request) {
  const cookieStore = cookies();
  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value; },
        set() {},
        remove() {},
      },
    }
  );
  const { data: { session } } = await client.auth.getSession();
  if (!session || session.user.user_metadata?.role !== 'admin') {
    return null;
  }
  return session;
}

export async function POST(request: Request) {
  const session = await requireAdmin(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase admin client not configured' },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.storage
      .from('gallery')
      .upload(`public/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}