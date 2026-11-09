import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ✅ Force the correct pooled URL, just in case Vercel env vars fail
const forcedDatabaseUrl = "postgresql://neondb_owner:npg_lm9JoCgtIDy7@ep-silent-rain-aqh9t6za-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || forcedDatabaseUrl,
      },
    },
    // ✅ Log errors so we can see them in Vercel logs
    log: ['error'], 
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;