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
  sassOptions: {
    // Bootstrap 5.3 still ships its Sass as a plain @import chain and uses
    // deprecated global functions internally, which is ~130 deprecation warnings
    // per build that we cannot fix on our side; quietDeps mutes those.
    //
    // 'import' is silenced on top of that because our own two files that must
    // stay on @import -- lib/assets/scss/global.scss (its variable assignments
    // have to interleave with bootstrap's partials) and the component shim
    // lib/assets/scss/_bootstrap.scss -- would otherwise repeat the same
    // unactionable warning for every stylesheet (41 per build). Component SCSS
    // is fully on @use/@forward; keep it that way, since only bootstrap's chain
    // justifies @import. Both options can go once Bootstrap is module-native.
    quietDeps: true,
    silenceDeprecations: ['import'],
  },
  // experimental: {
  //   webpackBuildWorker: true
  // },
};

export default nextConfig;

// export default withBundleAnalyzer(nextConfig);
