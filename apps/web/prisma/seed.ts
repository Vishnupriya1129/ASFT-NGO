import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

type CampaignSeedInput = {
  title: string;
  slug: string;
  summary: string;
  content: any;
  goalAmount: number;
  raisedAmount: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featuredImage: string;
  startDate: Date;
  endDate: Date;
  tags: string[];
  createdBy: string;
};

async function main() {
  console.log('🌱 Seeding Seed & Serve database...');

  // Create Admin User
  const adminPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'ChangeMe@2025!',
    12
  );
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@seedandserve.org' },
    update: {},
    create: {
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@seedandserve.org',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create Editor User
  const editorPassword = await bcrypt.hash('Editor@2025!', 12);
  const editor = await prisma.user.upsert({
    where: { email: 'editor@seedandserve.org' },
    update: {},
    create: {
      name: 'Content Editor',
      email: 'editor@seedandserve.org',
      passwordHash: editorPassword,
      role: 'EDITOR',
    },
  });
  console.log('✅ Editor user created:', editor.email);

  // Sample Campaigns
  const campaigns: CampaignSeedInput[] = [
    {
      title: 'Feed 1000 Children This Winter',
      slug: 'feed-1000-children-winter',
      summary: 'Providing nutritious meals to underprivileged children during the cold winter months.',
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Winter is especially harsh for children living on the streets and in orphanages. Our campaign aims to provide three nutritious meals daily to 1,000 children throughout the winter season.' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Every rupee you donate goes directly to food procurement, preparation, and distribution. We work with local farmers to ensure fresh, seasonal produce.' }] }
        ]
      },
      goalAmount: 500000,
      raisedAmount: 187500,
      status: 'PUBLISHED',
      featuredImage: 'https://www.owf.org.in/wp-content/uploads/2023/08/1-11.jpeg',
      startDate: new Date('2025-11-01'),
      endDate: new Date('2026-02-28'),
      tags: ['food', 'children', 'winter', 'nutrition'],
      createdBy: admin.id,
    },
    {
      title: 'Seed School — Education for All',
      slug: 'seed-school-education-for-all',
      summary: 'Free quality education for 500 underprivileged children in rural Karnataka.',
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Education is the most powerful seed we can plant. Our Seed School initiative provides completely free primary and secondary education to children from economically disadvantaged backgrounds.' }] }
        ]
      },
      goalAmount: 1000000,
      raisedAmount: 432000,
      status: 'PUBLISHED',
      featuredImage: 'https://thumbs.dreamstime.com/b/learning-alphabets-child-education-to-write-english-language-black-board-chalk-program-rural-villagers-kids-50691466.jpg',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2026-05-31'),
      tags: ['education', 'school', 'children', 'rural'],
      createdBy: admin.id,
    },
    {
      title: 'Elderly Care — Dignity in Every Meal',
      slug: 'elderly-care-dignity-in-every-meal',
      summary: 'Providing nutritious meals and care to senior citizens in old age homes.',
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Our elderly care program ensures that senior citizens in partner old age homes receive warm, home-style meals three times daily, with special dietary plans for health conditions.' }] }
        ]
      },
      goalAmount: 300000,
      raisedAmount: 98000,
      status: 'PUBLISHED',
      featuredImage: 'https://cimages.milaap.org/milaap/image/upload/c_fill,g_faces,h_315,w_420/v1588909306/production/images/campaign/170084/Sponsorship_of_food_to_oldagepeople_in_India_qmjozj_1588909315.jpg',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-12-31'),
      tags: ['elderly', 'care', 'meals', 'dignity'],
      createdBy: editor.id,
    },
  ];

  for (const campaign of campaigns) {
    await prisma.campaign.upsert({
      where: { slug: campaign.slug },
      update: {},
      create: campaign,
    });
  }
  console.log('✅ Sample campaigns created');

  // Sample Events
  const events = [
    {
      title: 'Annual Fundraiser Gala 2026',
      description: 'Join us for an evening of inspiration, music, and impact. Meet our beneficiaries and see firsthand the difference your donations make.',
      location: 'Bangalore, Karnataka',
      dateTime: new Date('2026-06-15T18:00:00'),
      capacity: 200,
      signupsCount: 47,
      createdBy: admin.id,
    },
    {
      title: 'Community Kitchen Drive',
      description: 'Volunteer for a day cooking and distributing meals to 500+ homeless individuals at railway stations across Bangalore.',
      location: 'Majestic Railway Station, Bangalore',
      dateTime: new Date('2026-05-10T08:00:00'),
      capacity: 50,
      signupsCount: 23,
      createdBy: admin.id,
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event }).catch(() => {});
  }
  console.log('✅ Sample events created');

  // Sample Impact Stories
  const impactStories = [
    {
      title: "Priya's Story — From Streets to School",
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Priya was 8 years old when our volunteers found her at Majestic Bus Stand, surviving on scraps. Today, she tops her class at Seed School and dreams of becoming a doctor.' }] }
        ]
      },
      images: ['https://path4all.org/wp-content/uploads/elementor/thumbs/door-step-school-ra4utngma853dxo0rze2fzhtns49h8gdlk4wj99vi8.jpg'],
      publishedAt: new Date('2025-03-15'),
    },
    {
      title: '25 Orphanages — 50,000 Meals Monthly',
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Our partnership with 25 orphanages across Karnataka ensures that 50,000 children receive balanced, nutritious meals every single month. This milestone was only possible because of your generous support.' }] }
        ]
      },
      images: ['https://www.mmpc.in/wp-content/uploads/2023/07/poverty-img-20-1.jpg'],
      publishedAt: new Date('2025-01-20'),
    },
  ];

  for (const story of impactStories) {
    await prisma.impactStory.create({ data: story }).catch(() => {});
  }
  console.log('✅ Sample impact stories created');

  // Sample Donations
  const donationsData = [
    { donorName: 'Rajesh Kumar', donorEmail: 'rajesh@example.com', amount: 1000, currency: 'INR', status: 'SUCCESS' as const },
    { donorName: 'Priya Sharma', donorEmail: 'priya@example.com', amount: 5000, currency: 'INR', status: 'SUCCESS' as const },
    { donorName: 'Anonymous', donorEmail: 'anon@example.com', amount: 500, currency: 'INR', status: 'SUCCESS' as const },
    { donorName: 'Arjun Singh', donorEmail: 'arjun@example.com', amount: 2000, currency: 'INR', status: 'SUCCESS' as const },
    { donorName: 'Meena Pillai', donorEmail: 'meena@example.com', amount: 10000, currency: 'INR', status: 'SUCCESS' as const },
  ];

  for (const d of donationsData) {
    await prisma.donation.create({ data: d }).catch(() => {});
  }
  console.log('✅ Sample donations created');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
