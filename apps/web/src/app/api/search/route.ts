import { NextRequest, NextResponse } from 'next/server';
import { MeiliSearch } from 'meilisearch';

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get('q') ?? '';
  if (!q) return NextResponse.json({ hits: [] });

  if (!process.env.MEILISEARCH_HOST) {
    return NextResponse.json({ hits: [] });
  }

  try {
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_API_KEY,
    });
    const results = await client.index('campaigns').search(q, {
      limit: 10,
      attributesToHighlight: ['title', 'summary'],
    });
    return NextResponse.json({ hits: results.hits });
  } catch (err) {
    console.error('Search error:', err);
    return NextResponse.json({ hits: [] });
  }
}
