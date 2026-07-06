// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add this if you want to test without optimization
    // unoptimized: true,
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vixzstrzqhwswhibzfdq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Add any other hosts if needed
    ],
  },
  // ... other config
};

module.exports = nextConfig;