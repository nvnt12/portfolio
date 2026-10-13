import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home folder confuses Turbopack's root detection.
  turbopack: { root: __dirname },
  // /work and /projects were the same list; old links land on the one that stayed.
  async redirects() {
    return [{ source: "/work", destination: "/projects", permanent: true }];
  },
};

export default nextConfig;
