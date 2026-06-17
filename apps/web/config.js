/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'https', hostname: '**.alamy.com' },
      { protocol: 'https', hostname: '**.dreamstime.com' },
      { protocol: 'https', hostname: '**.shutterstock.com' },
      { protocol: 'https', hostname: '**.milaap.org' },
      { protocol: 'https', hostname: '**.mmpc.in' },
      { protocol: 'https', hostname: '**.owf.org.in' },
      { protocol: 'https', hostname: '**.path4all.org' },
      { protocol: 'https', hostname: '**.asf.org.in' },
      { protocol: 'https', hostname: '**.picxy.com' },
      { protocol: 'https', hostname: 's3.amazonaws.com' },
      { protocol: 'https', hostname: '**.s3.amazonaws.com' },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },
  i18n: {
    locales: ['en', 'kn', 'hi'],
    defaultLocale: 'en',
  },
};

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
});