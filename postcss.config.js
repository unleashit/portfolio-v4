// eslint-disable-next-line @typescript-eslint/no-require-imports
const purgeCSSPlugin = require('@fullhuman/postcss-purgecss').default;

if (process.env.NODE_ENV === 'production') {
  plugins = {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    purgeCSSPlugin: purgeCSSPlugin({
      content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ['html', 'body', 'svg-inline--fa'],
    }),
  };
}

console.log(plugins);

module.exports = { plugins };
