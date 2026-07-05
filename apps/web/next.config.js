// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vixzstrzqhwswhibzfdq.supabase.co',
      },
      // other hosts...
    ],
  },
  // Remove staticOptimizationPages - it's not a valid Next.js config option
}

module.exports = nextConfig
module.exports = {
  // ... other config
  swcMinify: false, // Temporarily disable SWC
}