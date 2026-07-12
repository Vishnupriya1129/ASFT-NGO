import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('programs')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching programs:', error);
            return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const supabase = createClient();

        const { data, error } = await supabase
            .from('programs')
            .insert([{ ...body }])
            .select()
            .single();

        if (error) {
            console.error('Error creating program:', error);
            return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
