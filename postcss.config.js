// after an upgrade, vite started throwing errors because plugins aren't required/imported in the config
// but Next.js just wants the string name. Oddly, the problem only happens with the first plugin in the array
// const getPlugin = (plugin) =>
//   process.env.NODE_ENV === 'test' ? require(plugin) : plugin;

let config = {
  plugins: [],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    [
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: { flexbox: 'no-2009' },
          stage: 3,
          features: { 'custom-properties': false },
        },
      ],
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './app/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ['html', 'body', 'svg-inline--fa'],
      },
    ],
  );
}

module.exports = config;
