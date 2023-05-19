/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // trailingSlash: true,
  reactStrictMode: false,
  pageExtensions: ["page.jsx", "page.js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.fumeli.net/",
        port: "",
        pathname: "//UploadedFiles/**",
      },
    ],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.forEach((rule) => {
        if (rule.use) {
          const idx = rule.use.findIndex(
            (u) => u.loader === "next-style-loader"
          );
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
        source: "/:path.html",
        destination: "/:path",
      },
      {
        source: "/giai-dau/chi-tiet-giai-dau/:pid.html",
        destination: "/giai-dau/chi-tiet-giai-dau/:pid",
      },
      {
        source: "/nhiem-vu/invite.html",
        destination: "/nhiem-vu/invite",
      },
      {
        source: "/hoi-vien/activity.html",
        destination: "/hoi-vien/activity",
      },
      {
        source: "/hoi-vien/bag.html",
        destination: "/hoi-vien/bag",
      },
      {
        source: "/hoi-vien/friend.html",
        destination: "/hoi-vien/friend",
      },
      {
        source: "/hoi-vien/infoUser.html",
        destination: "/hoi-vien/infoUser",
      },
      {
        source: "/tham-gia/daily/:name/:pid.html",
        destination: "/nhiem-vu/:pid",
      },
      {
        source: "/tham-gia/daily/vong-quay-may-man/:pid.html",
        destination: "/vong-quay-may-man",
      },
      {
        source: "/tham-gia/other/:name/:pid.html",
        destination: "/nhiem-vu/:pid",
      },
    ];
  },
  serverRuntimeConfig: {
    pageConfig: {
      timeout: 300000, // Set the timeout to 5 minutes (300000ms)
    },
  },
  staticPageGenerationTimeout: 300000,
  env: {
    GOOGLE_CLIENT_ID:
      "586486200042-n2gsukec90iep47p3erp515l30m5ar68.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    NEXTAUTH_URL: "http://localhost:3000",
    apiHost: "https://api.fumeli.net/",
  },
};

module.exports = nextConfig;
