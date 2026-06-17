/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Image optimization – force unoptimized to avoid 500 errors and speed up navigation
  images: {
    unoptimized: true, // Changed: was 'process.env.NODE_ENV === 'development''
    remotePatterns: [
      // Unsplash images
      { protocol: 'https', hostname: 'bestinthecity.in' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      // NOTE: removed invalid entries that contained full URLs
      { protocol: 'https', hostname: 'img.marpic.com' },
      { protocol: 'https', hostname: 'childvikasfoundation.org' },
      { protocol: 'https', hostname: 'thehindu.com' },
      { protocol: 'https', hostname: 'dreamstime.com' },
      { protocol: 'https', hostname: '*.shutterstock.com' },
      { protocol: 'https', hostname: 'shutterstock.com' },
      // Partner organizations
      { protocol: 'https', hostname: '*.milaap.org' },
      { protocol: 'https', hostname: 'milaap.org' },
      { protocol: 'https', hostname: '*.mmpc.in' },
      { protocol: 'https', hostname: 'mmpc.in' },
      { protocol: 'https', hostname: '*.owf.org.in' },
      { protocol: 'https', hostname: 'owf.org.in' },
      { protocol: 'https', hostname: '*.path4all.org' },
      { protocol: 'https', hostname: 'path4all.org' },
      { protocol: 'https', hostname: '*.asf.org.in' },
      { protocol: 'https', hostname: 'asf.org.in' },
      { protocol: 'https', hostname: '*.picxy.com' },
      { protocol: 'https', hostname: 'picxy.com' },
    ],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] },
    optimizePackageImports: [
      '@lucide-react',
      'framer-motion',
    ],
  },
  // Enable static optimization
  staticPageGenerationTimeout: 120,
};

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
});