# 🌱 Seed & Serve — Complete Setup Guide

## Quick Start

### Option 1: Automated Setup (Recommended)
On Windows, double-click `setup.bat` in the root directory. This will:
1. Install pnpm if needed
2. Install all dependencies
3. Generate Prisma client
4. Run type checks
5. Run linting
6. Build the project

### Option 2: Manual Setup
Open Command Prompt or PowerShell and run:

```bash
# Navigate to project root
cd "c:\Users\vishn\seed and serve"

# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install

# Generate Prisma client
pnpm run prisma:generate

# Check for TypeScript errors
npm run typecheck

# Check for linting errors
npm run lint

# Build the project
npm run build
```

## Project Structure

```
seed-and-serve/
├── apps/
│   └── web/                 # Next.js 14 web application
│       ├── src/
│       │   ├── app/        # Next.js App Router pages
│       │   ├── components/ # React components
│       │   └── lib/        # Utility functions
│       ├── prisma/         # Database schema & migrations
│       ├── tests/          # Test files
│       └── package.json
├── package.json            # Root monorepo config
├── turbo.json             # Turbo build orchestration
├── .env                   # Environment variables (create from .env.example)
└── docker-compose.yml     # Local services (PostgreSQL, Meilisearch)
```

## Prerequisites

- **Node.js** ≥ 20.0.0
- **pnpm** ≥ 9.0.0 (package manager)
- **Docker & Docker Compose** (for local PostgreSQL and Meilisearch)

### Check Prerequisites
```bash
node --version      # Should be v20+
pnpm --version      # Should be 9.0+
docker --version    # Optional, for local services
```

## Environment Setup

1. **Create .env file** from template:
```bash
copy .env.example .env
```

2. **For local development**, these defaults should work:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/seedandserve"
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars-change-this-in-prod"
NEXTAUTH_URL="http://localhost:3000"
MEILISEARCH_HOST="http://localhost:7700"
```

3. **For production**, replace with actual values for:
   - Razorpay credentials
   - AWS S3 credentials
   - SendGrid API key
   - Sentry DSN
   - etc.

## Common Issues & Solutions

### Issue 1: "pnpm: command not found"
**Solution:**
```bash
npm install -g pnpm
```

### Issue 2: "Cannot find module" or TypeScript errors
**Solution:**
```bash
# Clear pnpm cache and reinstall
pnpm install --force
```

### Issue 3: Database migration errors
**Solution:**
```bash
# Make sure PostgreSQL is running via Docker
docker-compose up -d postgres

# Then run migrations
pnpm run db:push
# or
pnpm run db:migrate
```

### Issue 4: Prisma client not found
**Solution:**
```bash
# Regenerate Prisma client
pnpm run prisma:generate
```

### Issue 5: Port 3000 already in use
**Solution:**
```bash
# Find and kill process on port 3000, or use a different port
# In PowerShell:
Get-NetTCPConnection -LocalPort 3000 | Stop-Process -Force

# Or set custom port
set PORT=3001
npm run dev
```

## Development Workflow

### Start Development Server
```bash
# Option A: Run from root (runs all workspaces)
npm run dev

# Option B: Run just the web app
cd apps/web
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

### Testing
```bash
# Unit & component tests
npm run test

# End-to-end tests (requires app running)
npm run test:e2e
```

### Building
```bash
npm run build
```

## Database Setup (Local)

### Start PostgreSQL & Meilisearch
```bash
docker-compose up -d postgres meilisearch
```

### Initialize Database
```bash
cd apps/web

# Run migrations
npx prisma migrate deploy

# Seed sample data
npx prisma db seed

# Open Prisma Studio (UI for database)
npx prisma studio
```

## Useful Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Check code style |
| `npm run typecheck` | Check TypeScript types |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `pnpm run prisma:generate` | Generate Prisma client |
| `pnpm run db:push` | Sync schema with database |
| `pnpm run db:migrate` | Run database migrations |
| `pnpm run db:seed` | Seed database with sample data |
| `pnpm run db:studio` | Open Prisma Studio GUI |

## Deployment

### To Vercel
The CI/CD pipeline is configured in `.github/workflows/` to auto-deploy to Vercel on push to main.

### Docker
```bash
# Build
docker build -t seed-and-serve .

# Run
docker-compose up
```

## Troubleshooting Checklist

- [ ] Node.js version ≥ 20
- [ ] pnpm installed globally
- [ ] `pnpm install` completed without errors
- [ ] `.env` file created with required variables
- [ ] PostgreSQL running (via Docker or locally)
- [ ] Prisma client generated (`pnpm run prisma:generate`)
- [ ] Database migrations applied (`pnpm run db:migrate`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No linting errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

## Getting Help

1. **Check the RUNBOOK.md** for operational guidance
2. **Check the EDITOR_GUIDE.md** for code style guidelines
3. **Review error messages carefully** — they usually point to the exact issue
4. **Check GitHub Actions logs** if CI/CD fails

## Next Steps

1. Run `setup.bat` (Windows) or follow "Manual Setup" above
2. Fix any errors reported
3. Run `npm run dev` to start the development server
4. Open http://localhost:3000
5. Login with admin credentials from `.env`

Happy coding! 🚀
