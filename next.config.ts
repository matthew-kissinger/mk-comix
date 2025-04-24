/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mk-comix',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
