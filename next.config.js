/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["page.jsx"],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api-demowebsite.cdktcnqn.edu.vn',
        port: '',
        pathname: '//UploadedFiles/**'
      },
    ],
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.forEach((rule) => {
        if (rule.use) {
          const idx = rule.use.findIndex((u) => u.loader === "next-style-loader");
          if (idx !== -1) {
            rule.use.splice(idx, 0, {
              loader: "ignore-loader",
            });
          }
        }
      });
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/nhiem-vu',
        destination: '/nhiem-vu/index',
        permanent: true,
      },
      {
        source: '/nhiem-vu/:pid*',
        destination: '/nhiem-vu/[pid]',
        permanent: true,
      },
      {
        source: '/nhiem-vu/invite',
        destination: '/nhiem-vu/invite',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
