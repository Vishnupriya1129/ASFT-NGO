# Seed & Serve — Operations Runbook

## Quick Reference
| Service     | URL                          | Notes              |
|-------------|------------------------------|--------------------|
| Web App     | https://staging.seedandserve.org | Next.js on Vercel |
| Admin Panel | /admin                       | NextAuth protected |
| Database    | AWS RDS PostgreSQL           | Auto-backup daily  |
| Search      | Meilisearch :7700            | Self-hosted        |

---

## 1. How to Run Locally

### Prerequisites
- Node.js ≥ 20, pnpm ≥ 9, Docker & Docker Compose

### Steps
```bash
git clone https://github.com/your-org/seed-and-serve.git
cd seed-and-serve
cp .env.example .env              # Fill in your values
docker-compose up -d postgres meilisearch
pnpm install
cd apps/web
npx prisma migrate deploy
npx prisma db seed
pnpm dev                          # http://localhost:3000