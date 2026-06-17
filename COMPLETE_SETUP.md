# 🌱 Seed & Serve — Complete Installation & Setup

## 📋 Overview

This is a **monorepo** using:
- **pnpm workspaces** for dependency management
- **Turbo** for build orchestration  
- **Next.js 14** for the web application
- **TypeScript** for type safety
- **Prisma** for database management
- **PostgreSQL** for data persistence
- **Meilisearch** for search functionality

---

## 🚀 Quick Start (3 Steps)

### Step 1: Run Diagnostics
Double-click `diagnose.bat` to check prerequisites
- Verify Node.js ≥ 20.0.0 is installed
- Check if pnpm is available
- Verify project structure

### Step 2: Automated Setup
Double-click `setup.bat` to automatically:
- Install pnpm globally (if needed)
- Install all dependencies
- Generate Prisma client
- Run type checks
- Run linting  
- Build the project

### Step 3: Start Development
```bash
cd apps\web
npm run dev
```
Open http://localhost:3000

---

## 🔧 Manual Setup (If setup.bat doesn't work)

### Prerequisites
```bash
# Check you have Node.js ≥ 20.0.0
node --version

# Check you have npm
npm --version
```

### Step-by-Step

**1. Install pnpm**
```bash
npm install -g pnpm
```

**2. Create .env file**
```bash
copy .env.example .env
```
Edit `.env` with your configuration values.

**3. Install dependencies**
```bash
pnpm install
```
This installs dependencies for all workspaces (root, apps/web, etc.)

**4. Generate Prisma client**
```bash
pnpm run prisma:generate
```

**5. Type checking**
```bash
npm run typecheck
```
Ensure no TypeScript errors.

**6. Linting**
```bash
npm run lint
```
Check code style.

**7. Build**
```bash
npm run build
```
Build entire project via Turbo.

**8. Start dev server**
```bash
cd apps/web
npm run dev
```
Opens http://localhost:3000

---

## 🐳 Docker Setup (Optional)

If you want to use Docker for PostgreSQL and Meilisearch:

```bash
# Start services
docker-compose up -d postgres meilisearch

# Initialize database
cd apps/web
npx prisma migrate deploy
npx prisma db seed

# View database
npx prisma studio
```

---

## 📁 Project Structure

```
seed-and-serve/
├── apps/
│   └── web/                          # Next.js 14 web app
│       ├── src/
│       │   ├── app/                  # App Router pages/routes
│       │   │   ├── page.tsx          # Home page
│       │   │   ├── admin/            # Admin panel routes
│       │   │   ├── api/              # API routes
│       │   │   ├── auth/             # Auth pages
│       │   │   ├── campaigns/        # Campaign pages
│       │   │   └── volunteer/        # Volunteer pages
│       │   ├── components/           # React components
│       │   │   ├── layout/           # Layout components (Navbar, Footer)
│       │   │   ├── home/             # Home page sections
│       │   │   ├── admin/            # Admin components
│       │   │   └── campaigns/        # Campaign components
│       │   └── lib/                  # Utilities, helpers, hooks
│       ├── prisma/
│       │   ├── schema.prisma         # Database schema
│       │   ├── seed.ts               # Seed data
│       │   └── tests/                # Migration tests
│       ├── tests/                    # Test files
│       ├── jest.config.ts            # Jest configuration
│       ├── jest.setup.ts             # Jest setup
│       ├── playwright.config.ts      # E2E test config
│       ├── config.ts                 # Tailwind config
│       └── package.json              # Web app dependencies
├── .github/
│   └── workflows/                    # GitHub Actions CI/CD
├── infra/
│   └── db/                           # Database initialization
├── package.json                      # Root monorepo config
├── turbo.json                        # Turbo build pipeline
├── .env.example                      # Environment template
├── .env                              # Environment variables (create)
├── EDITOR_GUIDE.md                   # Code style guide
├── README.md                         # Project overview
├── RUNBOOK.md                        # Operations guide
├── SETUP_GUIDE.md                    # This setup guide
├── setup.bat                         # Automated setup script
├── diagnose.bat                      # Diagnostic script
├── validate.bat                      # Validation script
└── docker-compose.yml                # Docker services
```

---

## ✅ Verification Checklist

After setup, verify everything works:

### 1. Dependencies Installed
```bash
pnpm list
# Should show all packages without errors
```

### 2. TypeScript Valid
```bash
npm run typecheck
# Should complete without errors
```

### 3. Build Works
```bash
npm run build
# Should complete successfully
```

### 4. Server Starts
```bash
cd apps/web
npm run dev
# Should output: ▲ Next.js 14.2.2
#               - Local:        http://localhost:3000
```

### 5. Website Loads
Open http://localhost:3000 in browser
- You should see the Seed & Serve homepage
- No console errors in browser DevTools

---

## 🐛 Common Issues & Solutions

### ❌ "pnpm: command not found"
**Solution:**
```bash
npm install -g pnpm
pnpm --version  # Verify it's installed
```

### ❌ "Cannot find module 'prisma'"
**Solution:**
```bash
pnpm install
pnpm run prisma:generate
```

### ❌ "Port 3000 already in use"
**Solution - Option A: Kill process on port 3000**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution - Option B: Use different port**
```bash
set PORT=3001
npm run dev
```

### ❌ TypeScript/ESLint errors
**Check what's wrong:**
```bash
npm run typecheck     # See TypeScript errors
npm run lint          # See ESLint errors
```

**Most common fixes:**
- Missing semicolons
- Import statements incorrect
- Variable types not defined
- Components not properly exported

### ❌ Build fails
**Run with verbose output:**
```bash
npm run build -- --debug
```

### ❌ Prisma client not found
**Regenerate it:**
```bash
cd apps/web
npx prisma generate
```

### ❌ Database connection error
Make sure `.env` has correct DATABASE_URL:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/seedandserve"
```

If using Docker, start services:
```bash
docker-compose up -d postgres meilisearch
```

---

## 📝 Important Files to Know

| File | Purpose |
|------|---------|
| `.env` | Environment variables (database, secrets, API keys) |
| `apps/web/prisma/schema.prisma` | Database schema definition |
| `apps/web/src/app/page.tsx` | Home page component |
| `turbo.json` | Build pipeline configuration |
| `package.json` (root) | Monorepo dependencies & scripts |
| `package.json` (apps/web) | Web app specific dependencies |

---

## 🎯 Development Commands

### Running
```bash
npm run dev                    # Run all apps in dev mode
cd apps/web && npm run dev     # Run just web app
```

### Building
```bash
npm run build                  # Build entire project
npm run typecheck              # Type check only
npm run lint                   # Lint only
```

### Testing
```bash
npm run test                   # Run unit tests
npm run test:e2e               # Run E2E tests (requires app running)
```

### Database
```bash
pnpm run db:push               # Sync schema to database
pnpm run db:migrate            # Run migrations
pnpm run db:seed               # Seed with sample data
pnpm run db:studio             # Open Prisma Studio UI
```

---

## 🚨 If Something Still Doesn't Work

1. **Run diagnostic:**
   ```bash
   diagnose.bat
   ```

2. **Run validation:**
   ```bash
   validate.bat
   ```

3. **Check error output carefully** — it usually tells you exactly what's wrong

4. **Clear cache and reinstall:**
   ```bash
   pnpm store prune
   pnpm install --force
   ```

5. **Check prerequisites are met:**
   - Node.js ≥ 20.0.0
   - pnpm ≥ 9.0.0
   - .env file exists
   - .env has DATABASE_URL

6. **Read RUNBOOK.md** for operations guidance

---

## 📚 Next Steps

1. ✅ Run setup (setup.bat or manual)
2. ✅ Verify all checks pass
3. ✅ Start dev server: `npm run dev`
4. ✅ Open http://localhost:3000
5. ✅ Review EDITOR_GUIDE.md for code style
6. ✅ Start building features!

---

**Happy coding! 🚀**

Questions? Check:
- RUNBOOK.md — Operations guide
- EDITOR_GUIDE.md — Code style guide  
- README.md — Project overview
