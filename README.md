# 🌱 Seed & Serve — Dynamic Donation Platform

> *Where Sky Meets Earth, Hope Blooms*

A full-stack, production-ready donation platform for **Seed & Serve NGO** — built with Next.js 14, TypeScript, Prisma, Razorpay, and deployed with CI/CD on Vercel.

## ✨ Features
- 🌿 **Nature theme** — forest greens, soil browns, golden sun (fully preserved)
- 💳 **Razorpay Checkout** — end-to-end donation flow with webhook verification
- 📊 **Admin Dashboard** — donation totals, CSV export, campaign management
- 📝 **CMS-ready** — Campaigns, Events, Impact Stories via admin UI
- 🔐 **NextAuth** — RBAC with ADMIN / EDITOR / VOLUNTEER roles
- 🔍 **Meilisearch** — fast campaign/event search
- 📧 **Email receipts** — SendGrid-powered donation receipts
- ☁️ **S3 uploads** — signed URL image processing with Sharp
- 🧪 **Full test suite** — Jest unit, RTL component, Playwright E2E, axe WCAG checks
- 🚀 **CI/CD** — GitHub Actions → Vercel staging auto-deploy

## 🏗 Tech Stack
| Layer      | Technology                                |
|------------|-------------------------------------------|
| Frontend   | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend    | Next.js API Routes, Node.js, Prisma ORM   |
| Database   | PostgreSQL (AWS RDS / Supabase)           |
| Auth       | NextAuth.js v4 (Credentials + JWT)        |
| Payments   | Razorpay Checkout + Webhooks              |
| Search     | Meilisearch (self-hosted)                 |
| Email      | SendGrid                                  |
| Storage    | AWS S3 / Compatible (signed uploads)      |
| Monitoring | Sentry                                    |
| Infra      | Terraform (AWS)                           |
| CI/CD      | GitHub Actions + Vercel                   |

## 🚀 Quick Start (Local)
```bash
git clone https://github.com/your-org/seed-and-serve.git
cd seed-and-serve
cp .env.example .env         # Add your secrets
docker-compose up -d         # Start Postgres + Meilisearch
pnpm install
cd apps/web
npx prisma migrate deploy
npx prisma db seed
pnpm dev                     # http://localhost:3000