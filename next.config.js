// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: false,
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
