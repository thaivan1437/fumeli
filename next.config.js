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
  async rewrites() {
    return [
      {
        source: '/tham-gia/daily/:name/:pid',
        destination: '/nhiem-vu/:pid',
      },
    ]
  },
}

module.exports = nextConfig
