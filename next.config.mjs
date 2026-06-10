/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['next-mdx-remote'],
  },
};

export default nextConfig;

