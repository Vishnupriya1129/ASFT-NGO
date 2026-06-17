@echo off
REM Setup script for Seed & Serve monorepo
REM This script installs all dependencies and fixes errors

setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo 🌱 Seed and Serve - Complete Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ Error: Node.js is not installed or not in PATH
    echo   Please install Node.js from https://nodejs.org/ (>=20.0.0)
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version
echo.

REM Step 1: Check/Install pnpm
echo Step 1: Checking pnpm installation...
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo   Installing pnpm globally...
    call npm install -g pnpm
    if !errorlevel! neq 0 (
        echo ✗ Failed to install pnpm
        pause
        exit /b 1
    )
)
echo ✓ pnpm is ready
pnpm --version
echo.

REM Step 2: Create .env if it doesn't exist
echo Step 2: Checking environment configuration...
if not exist ".env" (
    echo   Creating .env file...
    copy ".env.example" ".env" >nul 2>&1
    if errorlevel 1 (
        echo   (Note: .env file needs to be created manually if .env.example doesn't exist)
    ) else (
        echo ✓ .env file created from .env.example
    )
) else (
    echo ✓ .env file already exists
)
echo.

REM Step 3: Install dependencies
echo Step 3: Installing dependencies with pnpm...
call pnpm install
if !errorlevel! neq 0 (
    echo ✗ Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Step 4: Generate Prisma client
echo Step 4: Generating Prisma client...
call pnpm run prisma:generate
if !errorlevel! neq 0 (
    echo ✗ Failed to generate Prisma client
    pause
    exit /b 1
)
echo ✓ Prisma client generated
echo.

REM Step 5: Type checking
echo Step 5: Running TypeScript type checks...
call npm run typecheck
if !errorlevel! neq 0 (
    echo ✗ TypeScript errors found (see above)
    echo.
    pause
    exit /b 1
)
echo ✓ TypeScript checks passed
echo.

REM Step 6: Linting
echo Step 6: Running ESLint...
call npm run lint
if !errorlevel! neq 0 (
    echo ✗ Linting errors found (see above)
    echo.
    pause
    exit /b 1
)
echo ✓ Linting passed
echo.

REM Step 7: Build
echo Step 7: Building project...
call npm run build
if !errorlevel! neq 0 (
    echo ✗ Build failed (see above)
    echo.
    pause
    exit /b 1
)
echo ✓ Build successful
echo.

echo ====================================
echo ✓ Setup completed successfully!
echo ====================================
echo.
echo Next steps:
echo   1. cd apps/web
echo   2. npm run dev
echo   3. Open http://localhost:3000
echo.
pause
