/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST
  },
  reactStrictMode: false,
};

export default nextConfig;
