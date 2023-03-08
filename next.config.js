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
}

module.exports = nextConfig
