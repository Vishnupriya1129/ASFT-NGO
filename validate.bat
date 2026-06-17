@echo off
REM Seed and Serve - Quick Validator
REM Run this after pnpm install to check for common issues

setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ✓ Seed and Serve - Installation Validator
echo ============================================
echo.

set /a errors=0
set /a warnings=0

REM Check 1: node_modules exists
echo [1] Checking if dependencies are installed...
if exist "node_modules" (
    echo ✓ node_modules found
) else (
    echo ✗ node_modules not found - Run: pnpm install
    set /a errors+=1
)
echo.

REM Check 2: .env file
echo [2] Checking environment configuration...
if exist ".env" (
    echo ✓ .env file exists
) else (
    echo ⚠ .env file not found - Run: copy .env.example .env
    set /a warnings+=1
)
echo.

REM Check 3: Web app node_modules
echo [3] Checking web app dependencies...
if exist "apps\web\node_modules" (
    echo ✓ Web app dependencies installed
) else (
    echo ⚠ Web app node_modules not found (pnpm workspaces should handle this)
)
echo.

REM Check 4: Prisma schema
echo [4] Checking Prisma configuration...
if exist "apps\web\prisma\schema.prisma" (
    echo ✓ Prisma schema found
) else (
    echo ✗ Prisma schema not found
    set /a errors+=1
)
echo.

REM Check 5: Try building
echo [5] Attempting to build project...
call npm run build >nul 2>&1
if !errorlevel! equ 0 (
    echo ✓ Build successful
) else (
    echo ✗ Build failed - Check error logs above
    set /a errors+=1
)
echo.

REM Check 6: Type checking
echo [6] Running TypeScript checks...
call npm run typecheck >nul 2>&1
if !errorlevel! equ 0 (
    echo ✓ TypeScript checks passed
) else (
    echo ⚠ TypeScript errors found (run 'npm run typecheck' for details)
    set /a warnings+=1
)
echo.

REM Check 7: Linting
echo [7] Running ESLint...
call npm run lint >nul 2>&1
if !errorlevel! equ 0 (
    echo ✓ Linting passed
) else (
    echo ⚠ Linting errors found (run 'npm run lint' for details)
    set /a warnings+=1
)
echo.

echo ============================================
echo 📊 Summary
echo ============================================
echo Errors:   !errors!
echo Warnings: !warnings!
echo.

if !errors! gtr 0 (
    echo ✗ Installation has critical errors
    echo   Please fix errors above before running dev
    pause
    exit /b 1
) else (
    if !warnings! gtr 0 (
        echo ⚠ Installation complete but with warnings
        echo   You can try running dev, but fix warnings when possible
    ) else (
        echo ✓ All checks passed!
        echo   Ready to run development server
    )
)

echo.
echo Next steps:
echo   1. cd apps\web
echo   2. npm run dev
echo   3. Open http://localhost:3000
echo.
pause
