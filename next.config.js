/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SCRAPINGBEE_API_KEY: process.env.SCRAPINGBEE_API_KEY,
  },
}

module.exports = nextConfig