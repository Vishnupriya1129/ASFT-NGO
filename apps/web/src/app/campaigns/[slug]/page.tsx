import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DonationWidget } from '@/components/campaigns/DonationWidget';
import { ArrowLeft, Target, Calendar, Users } from 'lucide-react';

async function getCampaign(slug: string) {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not configured. Campaign detail cannot be loaded from the database.');
    return null;
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    return await prisma.campaign.findUnique({
      where: { slug },
      include: {
        creator: { select: { name: true } },
        _count: { select: { donations: true } },
      },
    });
  } catch (error) {
    console.warn('Database error loading campaign:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const campaign = await getCampaign(params.slug);
  if (!campaign) return { title: 'Campaign Not Found' };
  return {
    title: campaign.title,
    description: campaign.summary,
    openGraph: campaign.featuredImage
      ? { images: [{ url: campaign.featuredImage, alt: campaign.title }] }
      : undefined,
  };
}

export default async function CampaignDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const campaign = await getCampaign(params.slug);

  if (!campaign || campaign.status !== 'PUBLISHED') notFound();

  const pct = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);
  const endDate = campaign.endDate
    ? new Date(campaign.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cloud pt-24" id="main-content">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-forest-mid font-medium mb-8 hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft size={16} /> Back to Campaigns
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {campaign.featuredImage && (
                <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-sky-pale to-cloud">
                  <Image
                    src={campaign.featuredImage}
                    alt={campaign.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {(campaign.tags as string[]).map((tag: string) => (
                  <span key={tag} className="badge-status-published capitalize">{tag}</span>
                ))}
              </div>

              <h1 className="font-serif text-5xl text-soil-dark leading-tight">
                {campaign.title}
              </h1>

              <p className="text-stone text-xl leading-relaxed">{campaign.summary}</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Target,   label: 'Goal',      value: `₹${campaign.goalAmount.toLocaleString('en-IN')}` },
                  { icon: Users,    label: 'Donations',  value: campaign._count.donations.toString() },
                  ...(endDate ? [{ icon: Calendar, label: 'Ends', value: endDate }] : []),
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="card p-5 text-center">
                    <Icon size={20} className="text-forest-mid mx-auto mb-2" />
                    <div className="font-serif text-xl font-bold text-soil-dark">{value}</div>
                    <div className="text-stone text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="card p-6">
                <div className="flex justify-between mb-3 font-semibold">
                  <span className="text-forest-mid text-lg">
                    ₹{campaign.raisedAmount.toLocaleString('en-IN')} raised
                  </span>
                  <span className="text-stone">{Math.round(pct)}%</span>
                </div>
                <div className="progress-bar h-3">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-stone text-sm mt-2">
                  of ₹{campaign.goalAmount.toLocaleString('en-IN')} goal
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-stone max-w-none">
                {Array.isArray((campaign.content as any)?.content) &&
                  (campaign.content as any).content.map((block: any, i: number) => (
                    <p key={i} className="text-stone leading-relaxed mb-4">
                      {block.content?.[0]?.text}
                    </p>
                  ))}
              </div>
            </div>

            {/* Donation Widget */}
            <div className="lg:sticky lg:top-28 h-fit">
              <DonationWidget
                campaignId={campaign.id}
                campaignTitle={campaign.title}
                goalAmount={campaign.goalAmount}
                raisedAmount={campaign.raisedAmount}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
