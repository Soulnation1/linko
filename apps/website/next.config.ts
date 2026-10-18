import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  transpilePackages: ["@linko/ui"],
};

export default nextConfig;
