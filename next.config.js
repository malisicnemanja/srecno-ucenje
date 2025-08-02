/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_URL || 'localhost',
      },
    ],
  },
  i18n: {
    locales: ['sr', 'en'],
    defaultLocale: 'sr',
  },
}

module.exports = nextConfig
