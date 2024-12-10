/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    API_KEY: process.env.API_KEY,
    CONTEXT_KEY: process.env.CONTEXT_KEY,
  },
};
export default nextConfig;
