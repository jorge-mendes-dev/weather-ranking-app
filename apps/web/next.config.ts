import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@weather-app/types'],
};

export default nextConfig;
