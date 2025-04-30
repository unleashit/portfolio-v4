let plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push([
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ]);

  // postcss purgecss currently requires a patch to fix module compat with Next.js
  // https://github.com/FullHuman/purgecss/issues/1295#issuecomment-2811887004
  plugins.push([
    '@fullhuman/postcss-purgecss',
    {
      content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ['html', 'body', 'svg-inline--fa'],
    },
  ]);
}

module.exports = { plugins };
