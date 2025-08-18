/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/gw-jh_wedding_invitation' : '',
  assetPrefix: isProd ? '/gw-jh_wedding_invitation/' : '',
};

export default nextConfig;
