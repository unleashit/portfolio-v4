// import bundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';
//
// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
//   openAnalyzer: false,
// });

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  reactStrictMode: true,
  poweredByHeader: false,
  // experimental: {
  //   webpackBuildWorker: true
  // },
};

export default nextConfig;

// export default withBundleAnalyzer(nextConfig);
