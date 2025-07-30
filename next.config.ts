import type { NextConfig } from 'next';
import withMDX from '@next/mdx';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    // You can add MDX options here if needed
  },
})(nextConfig);
