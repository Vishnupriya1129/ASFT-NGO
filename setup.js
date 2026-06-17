#!/usr/bin/env node

/**
 * Setup script for Seed & Serve monorepo
 * Installs dependencies and validates the project
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
let hasErrors = false;

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    reset: '\x1b[0m',
  };
  const prefix = {
    info: '✓',
    success: '✓',
    error: '✗',
    warning: '⚠',
  };
  console.log(`${colors[type]}${prefix[type]} ${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`Running: ${description}...`, 'info');
    execSync(command, { stdio: 'inherit', cwd });
    log(`✓ ${description} completed`, 'success');
    return true;
  } catch (error) {
    log(`✗ ${description} failed`, 'error');
    hasErrors = true;
    return false;
  }
}

async function main() {
  console.log('\n🌱 Seed & Serve Setup Script\n');

  // Step 1: Check if pnpm is installed
  try {
    execSync('pnpm --version', { stdio: 'pipe' });
    log('pnpm is installed', 'success');
  } catch {
    log('Installing pnpm globally...', 'warning');
    runCommand('npm install -g pnpm', 'Install pnpm');
  }

  // Step 2: Install dependencies
  runCommand('pnpm install', 'Install dependencies');

  // Step 3: Generate Prisma client
  runCommand('pnpm run prisma:generate', 'Generate Prisma client');

  // Step 4: Type checking
  runCommand('npm run typecheck', 'TypeScript type checking');

  // Step 5: Linting
  runCommand('npm run lint', 'ESLint linting');

  // Step 6: Build
  runCommand('npm run build', 'Build project');

  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    log('Setup completed with errors. Please review above.', 'warning');
    process.exit(1);
  } else {
    log('✓ Setup completed successfully!', 'success');
    log('Run "npm run dev" to start the development server', 'info');
    console.log('='.repeat(50) + '\n');
    process.exit(0);
  }
}

main().catch((error) => {
  log(`Fatal error: ${error.message}`, 'error');
  process.exit(1);
});
