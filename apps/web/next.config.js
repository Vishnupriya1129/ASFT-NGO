/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Image optimization – force unoptimized to avoid 500 errors and speed up navigation
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'bestinthecity.in' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'img.marpic.com' },
      { protocol: 'https', hostname: 'childvikasfoundation.org' },
      { protocol: 'https', hostname: 'thehindu.com' },
      { protocol: 'https', hostname: 'dreamstime.com' },
      { protocol: 'https', hostname: '*.shutterstock.com' },
      { protocol: 'https', hostname: 'shutterstock.com' },
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
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;