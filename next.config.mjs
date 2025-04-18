/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '139.59.15.8',
          port: '8003',
          pathname: '/api/v1/media/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  