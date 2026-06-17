import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { slug: params.slug },
      include: {
        creator: { select: { name: true, email: true } },
        _count:  { select: { donations: true } },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json({ data: campaign });
  } catch (err) {
    console.error('GET /api/campaigns/:slug error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
