/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["www.google.com", "books.google.com"] },
};

module.exports = nextConfig;
