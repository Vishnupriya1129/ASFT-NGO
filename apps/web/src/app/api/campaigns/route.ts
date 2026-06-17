import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const querySchema = z.object({
  page:   z.coerce.number().min(1).default(1),
  limit:  z.coerce.number().min(1).max(50).default(10),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  tag:    z.string().optional(),
  q:      z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const url    = new URL(req.url);
    const params = querySchema.parse(Object.fromEntries(url.searchParams));
    const skip   = (params.page - 1) * params.limit;

    const where: any = {};
    if (params.status) where.status = params.status;
    else where.status = 'PUBLISHED';
    if (params.tag)    where.tags   = { has: params.tag };
    if (params.q)      where.OR     = [
      { title:   { contains: params.q, mode: 'insensitive' } },
      { summary: { contains: params.q, mode: 'insensitive' } },
    ];

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        skip,
        take: params.limit,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true, title: true, slug: true, summary: true,
          goalAmount: true, raisedAmount: true, status: true,
          featuredImage: true, startDate: true, endDate: true,
          tags: true, updatedAt: true,
        },
      }),
      prisma.campaign.count({ where }),
    ]);

    return NextResponse.json({
      data:       campaigns,
      pagination: { page: params.page, limit: params.limit, total, pages: Math.ceil(total / params.limit) },
    });
  } catch (err) {
    console.error('GET /api/campaigns error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
