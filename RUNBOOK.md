# Seed & Serve - Operations Runbook

## Overview

| Service | URL | Notes |
|---------|-----|-------|
| Web App | https://staging.seedandserve.org | NextJS 14 |
| Admin Panel | /admin | NextAuth protected |
| Database | AWS RDS PostgreSQL | Auto-backup daily |
| Search | Meilisearch:7700 | Self-hosted |

## How to Run Locally

### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL 14+
- Git

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/Vishnupriya1129/ASFT-NGO.git
cd ASFT-NGO

# Install dependencies from root
npm install --legacy-peer-deps

# Navigate to web app
cd apps/web

# Install web dependencies
npm install --legacy-peer-deps

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev