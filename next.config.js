/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel deployment optimization
  output: 'standalone',
  // Allow cross-origin for development
  allowedDevOrigins: ['192.168.1.7'],
}

module.exports = nextConfig
