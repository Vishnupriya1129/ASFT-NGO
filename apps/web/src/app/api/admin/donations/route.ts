import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type DonationWithCampaign = {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  status: string;
  razorpayPaymentId: string | null;
  createdAt: Date;
  campaign: { title: string } | null;
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url    = new URL(req.url);
  const format = url.searchParams.get('format');
  const page   = parseInt(url.searchParams.get('page')  ?? '1');
  const limit  = parseInt(url.searchParams.get('limit') ?? '50');

  const [donations, total] = await Promise.all([
    prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
      skip:  (page - 1) * limit,
      take:  limit,
      include: { campaign: { select: { title: true } } },
    }),
    prisma.donation.count(),
  ]);

  if (format === 'csv') {
    const rows = [
      ['ID', 'Name', 'Email', 'Amount', 'Currency', 'Status', 'Campaign', 'Payment ID', 'Date'],
      ...(donations as DonationWithCampaign[]).map((d) => [
        d.id, d.donorName, d.donorEmail, d.amount, d.currency, d.status,
        d.campaign?.title ?? '', d.razorpayPaymentId ?? '', d.createdAt.toISOString(),
      ]),
    ];
    const csv  = rows.map((r) => r.join(',')).join('\n');
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="donations-${Date.now()}.csv"`,
      },
    });
  }

  const totals = await prisma.donation.aggregate({
    where:  { status: 'SUCCESS' },
    _sum:   { amount: true },
    _count: { id: true },
  });

  return NextResponse.json({
    data: donations,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    summary: {
      totalRaised: totals._sum.amount ?? 0,
      totalDonors: totals._count.id ?? 0,
    },
  });
}
