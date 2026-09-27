import { NextResponse } from 'next/server';
import { getProgramTree } from '@/lib/programs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const tree = await getProgramTree();
    return NextResponse.json(tree);
  } catch (error) {
    console.error('Error fetching program tree:', error);
    return NextResponse.json([], { status: 500 });
  }
}