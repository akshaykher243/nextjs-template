/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PAYLOAD_URL: process.env.PAYLOAD_URL,
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  },
  // Enable server-side environment variables
  serverRuntimeConfig: {
    PAYLOAD_URL: process.env.PAYLOAD_URL,
  },
  // Enable client-side environment variables
  publicRuntimeConfig: {
    NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  },
  // Configure for static export if needed
  output: 'standalone',
  // Disable image optimization for Edge Runtime
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
