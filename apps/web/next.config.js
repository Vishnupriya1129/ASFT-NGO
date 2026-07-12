/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vixzstrzqhwswhibzfdq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com', // ✅ Add this for placeholder avatars
        pathname: '/api/**',
      },
    ],
  },
  // ... any other config
};

module.exports = nextConfig;