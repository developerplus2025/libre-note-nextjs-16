import { createMDX } from "fumadocs-mdx/next";
const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  images: {
    domains: ["api.microlink.io", "i.scdn.co", "workoscdn.com"],
  },
};

export default withMDX(nextConfig);
