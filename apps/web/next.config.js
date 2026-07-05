/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vixzstrzqhwswhibzfdq.supabase.co',
      },
    ],
  },

  compress: true,

  poweredByHeader: false,

  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;