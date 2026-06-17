import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { Search } from 'lucide-react';

type CampaignListItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  goalAmount: number;
  raisedAmount: number;
  featuredImage: string | null;
  startDate: Date | null;
  endDate: Date | null;
  tags: string[];
  status: string;
};

export const metadata: Metadata = {
  title: 'Campaigns',
  description: 'Support our ongoing campaigns — from feeding children to funding education.',
};

export const revalidate = 60;

// Fallback demo campaigns
const DEMO_CAMPAIGNS: CampaignListItem[] = [
  {
    id: '1',
    title: 'Nutritious Meals for Children',
    slug: 'nutrition-children',
    summary: 'Provide wholesome meals to 500 orphaned children for 3 months.',
    goalAmount: 150000,
    raisedAmount: 89000,
    featuredImage: 'https://newsblaze.in/wp-content/uploads/2015/07/mid-day-meal-for-children.jpg',
    startDate: new Date('2026-05-01'),
    endDate: new Date('2026-08-01'),
    tags: ['nutrition', 'children'],
    status: 'PUBLISHED',
  },
  {
    id: '2',
    title: 'Education for Rural Students',
    slug: 'education-rural',
    summary: 'Build a learning center and provide education materials for 200 rural students.',
    goalAmount: 200000,
    raisedAmount: 120000,
    featuredImage: 'https://miro.medium.com/v2/resize:fit:1200/1*ljUXxlP4L0Hq1r-blmOUPQ.jpeg',
    startDate: new Date('2026-04-15'),
    endDate: new Date('2026-10-15'),
    tags: ['education', 'rural'],
    status: 'PUBLISHED',
  },
  {
    id: '3',
    title: 'Healthcare for Elderly',
    slug: 'healthcare-elderly',
    summary: 'Annual health check camps and medical support for senior citizens.',
    goalAmount: 100000,
    raisedAmount: 65000,
    featuredImage: 'https://give.do/blog/wp-content/uploads/2024/04/NGO-for-senior-citizens-Give-blog-banner-scaled.jpg',
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-12-01'),
    tags: ['health', 'elderly'],
    status: 'PUBLISHED',
  },
];

const DEMO_TAGS = ['nutrition', 'education', 'health', 'children', 'rural', 'elderly'];

async function getCampaignsData(searchParams: { q?: string; tag?: string; page?: string }) {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not configured. Falling back to demo campaign data.');
    return {
      campaigns: DEMO_CAMPAIGNS,
      total: DEMO_CAMPAIGNS.length,
      uniqueTags: DEMO_TAGS,
    };
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    
    const page = parseInt(searchParams.page ?? '1');
    const limit = 9;
    const skip = (page - 1) * limit;

    const where: any = { status: 'PUBLISHED' };
    if (searchParams.tag) where.tags = { has: searchParams.tag };
    if (searchParams.q) {
      where.OR = [
        { title: { contains: searchParams.q, mode: 'insensitive' } },
        { summary: { contains: searchParams.q, mode: 'insensitive' } },
      ];
    }

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          goalAmount: true,
          raisedAmount: true,
          featuredImage: true,
          startDate: true,
          endDate: true,
          tags: true,
          status: true,
        },
      }),
      prisma.campaign.count({ where }),
    ]);

    const allTags = await prisma.campaign.findMany({
      where: { status: 'PUBLISHED' },
      select: { tags: true },
    });

    const uniqueTags: string[] = [
      ...new Set(
        (allTags as any[]).flatMap((c) =>
          c.tags.filter((tag: unknown): tag is string => typeof tag === 'string')
        )
      ),
    ];

    return { campaigns, total, uniqueTags };
  } catch (error) {
    console.warn('Database error loading campaigns, using demo data:', error);
    return {
      campaigns: DEMO_CAMPAIGNS,
      total: DEMO_CAMPAIGNS.length,
      uniqueTags: DEMO_TAGS,
    };
  }
}

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: { q?: string; tag?: string; page?: string };
}) {
  const page = parseInt(searchParams.page ?? '1');
  const limit = 9;

  const { campaigns, total, uniqueTags } = await getCampaignsData(searchParams);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24" id="main-content">
        {/* Header */}
        <div className="py-16 text-center bg-gradient-to-b from-sky-pale to-cloud">
          <span className="section-tag">Our Campaigns</span>
          <h1 className="font-serif text-6xl text-soil-dark mb-4">
            Seeds of Change
          </h1>
          <p className="text-stone text-xl max-w-xl mx-auto">
            Every campaign is a mission. Your support helps us fulfil it.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <form className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone" size={18} />
              <input
                name="q"
                defaultValue={searchParams.q}
                placeholder="Search campaigns..."
                className="form-input pl-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/campaigns"
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  !searchParams.tag
                    ? 'bg-forest-mid text-white'
                    : 'bg-earth-cream text-soil-mid hover:bg-leaf-pale'
                }`}
              >
                All
              </a>
              {uniqueTags.map((tag: string) => (
                <a
                  key={tag}
                  href={`/campaigns?tag=${tag}`}
                  className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                    searchParams.tag === tag
                      ? 'bg-forest-mid text-white'
                      : 'bg-earth-cream text-soil-mid hover:bg-leaf-pale'
                  }`}
                >
                  {tag}
                </a>
              ))}
            </div>
          </form>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {campaigns.length === 0 ? (
            <div className="text-center py-24 text-stone">
              <p className="text-2xl font-serif mb-3">No campaigns found</p>
              <p>Try a different search or browse all campaigns.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(campaigns as CampaignListItem[]).map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {total > limit && (
            <div className="flex justify-center gap-3 mt-14">
              {Array.from({ length: Math.ceil(total / limit) }).map((_, i) => (
                <a
                  key={i}
                  href={`/campaigns?page=${i + 1}${searchParams.tag ? `&tag=${searchParams.tag}` : ''}`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    page === i + 1
                      ? 'bg-forest-mid text-white'
                      : 'bg-earth-cream text-soil-mid hover:bg-leaf-pale'
                  }`}
                >
                  {i + 1}
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
