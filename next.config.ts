import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to static HTML in out/, which Firebase Hosting serves (see firebase.json).
  output: "export",
  // The default next/image optimizer needs a server; static export serves images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
