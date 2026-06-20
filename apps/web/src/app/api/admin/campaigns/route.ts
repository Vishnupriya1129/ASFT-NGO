export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { auditLog } from '@/lib/audit';

const campaignSchema = z.object({
  title:        z.string().min(3).max(200),
  slug:         z.string().regex(/^[a-z0-9-]+$/),
  summary:      z.string().min(10).max(500),
  content:      z.any(),
  goalAmount:   z.number().min(1),
  status:       z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  featuredImage: z.string().url().optional(),
  startDate:    z.string().optional(),
  endDate:      z.string().optional(),
  tags:         z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = campaignSchema.parse(body);

    const campaign = await prisma.campaign.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content ?? {},
        goalAmount: data.goalAmount,
        status: data.status,
        featuredImage: data.featuredImage,
        tags: data.tags,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate:   data.endDate   ? new Date(data.endDate)   : undefined,
        createdBy: session.user.id,
      },
    });

    await auditLog({
      userId:   session.user.id,
      action:   'CAMPAIGN_CREATED',
      resource: 'campaign',
      details:  { campaignId: campaign.id, title: campaign.title },
    });

    return NextResponse.json({ data: campaign }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    console.error('POST /api/admin/campaigns error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const campaigns = await prisma.campaign.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { donations: true } } },
  });

  return NextResponse.json({ data: campaigns });
}
