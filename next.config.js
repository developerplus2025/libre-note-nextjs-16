const { createMDX } = require("fumadocs-mdx/next");
const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/c15t/:path*",
        destination: `${process.env.NEXT_PUBLIC_C15T_URL}/:path*`,
      },
    ];
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  turbopack: {
    resolveAlias: {
      underscore: "lodash",
    },
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif"],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4)$/,
      type: "asset/resource",
    });
    return config;
  },
};

// Gộp 2 middleware lại
module.exports = withMDX(nextConfig);
