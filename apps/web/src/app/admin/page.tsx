import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR') {
    redirect('/');
  }

  const [
    totalDonations,
    totalRaised,
    activeCampaigns,
    totalVolunteers,
    recentDonations,
    campaigns,
  ] = await Promise.all([
    prisma.donation.count({ where: { status: 'SUCCESS' } }),
    prisma.donation.aggregate({ where: { status: 'SUCCESS' }, _sum: { amount: true } }),
    prisma.campaign.count({ where: { status: 'PUBLISHED' } }),
    prisma.volunteer.count(),
    prisma.donation.findMany({
      where:   { status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { campaign: { select: { title: true } } },
    }),
    prisma.campaign.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, status: true, raisedAmount: true, goalAmount: true },
    }),
  ]);

  return (
    <AdminDashboard
      stats={{
        totalDonations,
        totalRaised:    totalRaised._sum.amount ?? 0,
        activeCampaigns,
        totalVolunteers,
      }}
      recentDonations={recentDonations}
      campaigns={campaigns}
      session={session}
    />
  );
}