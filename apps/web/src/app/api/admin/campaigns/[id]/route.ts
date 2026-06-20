export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  title:        z.string().min(3).max(200).optional(),
  summary:      z.string().min(10).max(500).optional(),
  content:      z.any().optional(),
  goalAmount:   z.number().min(1).optional(),
  status:       z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featuredImage: z.string().url().optional(),
  tags:         z.array(z.string()).optional(),
  endDate:      z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const campaign = await prisma.campaign.update({
      where: { id: params.id },
      data: {
        ...data,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });

    return NextResponse.json({ data: campaign });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden — Admin only' }, { status: 403 });
  }

  await prisma.campaign.update({
    where: { id: params.id },
    data:  { status: 'ARCHIVED' },
  });

  return NextResponse.json({ success: true });
}
