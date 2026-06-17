@echo off
REM Diagnostic script for Seed & Serve
REM This script checks for common configuration issues

setlocal enabledelayedexpansion

echo.
echo 🔍 Seed and Serve - Diagnostic Report
echo ======================================
echo.

REM Check Node.js
echo [1] Checking Node.js...
where node >nul 2>nul
if !errorlevel! equ 0 (
    echo ✓ Node.js found
    node --version
) else (
    echo ✗ Node.js not found - INSTALL REQUIRED
    echo   Download from: https://nodejs.org/ (≥20.0.0)
)
echo.

REM Check npm
echo [2] Checking npm...
where npm >nul 2>nul
if !errorlevel! equ 0 (
    echo ✓ npm found
    npm --version
) else (
    echo ✗ npm not found
)
echo.

REM Check pnpm
echo [3] Checking pnpm...
where pnpm >nul 2>nul
if !errorlevel! equ 0 (
    echo ✓ pnpm found
    pnpm --version
) else (
    echo ⚠ pnpm not installed globally
    echo   Install with: npm install -g pnpm
)
echo.

REM Check Git
echo [4] Checking Git...
where git >nul 2>nul
if !errorlevel! equ 0 (
    echo ✓ Git found
    git --version
) else (
    echo ⚠ Git not found (optional)
)
echo.

REM Check Docker
echo [5] Checking Docker...
where docker >nul 2>nul
if !errorlevel! equ 0 (
    echo ✓ Docker found
    docker --version
) else (
    echo ⚠ Docker not found (optional, for local services)
)
echo.

REM Check .env file
echo [6] Checking environment configuration...
if exist ".env" (
    echo ✓ .env file exists
) else (
    echo ✗ .env file NOT found
    if exist ".env.example" (
        echo   Copy .env.example to .env: copy .env.example .env
    )
)
echo.

REM Check key directories
echo [7] Checking project structure...
if exist "apps\web" (
    echo ✓ apps/web directory found
) else (
    echo ✗ apps/web directory not found
)

if exist "prisma" (
    echo ✓ prisma directory found
) else (
    echo ⚠ prisma directory not found (may be in apps/web/prisma)
)
echo.

REM Check package.json
echo [8] Checking package.json...
if exist "package.json" (
    echo ✓ Root package.json found
    if exist "apps\web\package.json" (
        echo ✓ Web app package.json found
    ) else (
        echo ✗ Web app package.json not found
    )
) else (
    echo ✗ package.json not found
)
echo.

REM Check node_modules
echo [9] Checking installed dependencies...
if exist "node_modules" (
    echo ✓ node_modules directory exists (dependencies installed)
) else (
    echo ⚠ node_modules not found
    echo   Run: pnpm install
)
echo.

REM Check database connection (optional)
echo [10] Checking database availability...
echo   (This requires PostgreSQL to be running)
findstr /i "DATABASE_URL" .env >nul 2>&1
if !errorlevel! equ 0 (
    echo ✓ DATABASE_URL configured in .env
) else (
    echo ✗ DATABASE_URL not found in .env
)
echo.

echo ======================================
echo 📋 Summary
echo ======================================
echo If all checks above show ✓, you're ready to run setup.bat
echo If you see ✗ or ⚠, follow the suggested fixes
echo.
pause
