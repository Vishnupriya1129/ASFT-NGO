import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from('gallery')
      .update({
        image_url: body.image_url,
        year: body.year ? parseInt(body.year) : null,
        event: body.event,
        title: body.title,
        caption: body.caption,
        span: body.span,
      })
      .eq('id', params.id).select().single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { error } = await supabaseAdmin.from('gallery').delete().eq('id', params.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}