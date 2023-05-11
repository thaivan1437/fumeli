/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["page.jsx", "page.js"],
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
  env: {
    GOOGLE_CLIENT_ID: '586486200042-n2gsukec90iep47p3erp515l30m5ar68.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    NEXTAUTH_URL: "http://localhost:3000",
    apiHost: 'https://api-demowebsite.cdktcnqn.edu.vn/api/'
  }
}

module.exports = nextConfig
