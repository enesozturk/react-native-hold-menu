module.exports = {
  title: 'React Native Hold Menu',
  tagline:
    'A lean, modern hold-to-open context menu for React Native powered by Reanimated 4.',
  url: 'https://enesozturk.github.io',
  baseUrl: '/react-native-hold-menu/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: 'img/favicon.ico',
  organizationName: 'enesozturk',
  projectName: 'react-native-hold-menu',
  themeConfig: {
    twitterImage: 'img/og.png',
    image: 'img/og.png',
    navbar: {
      title: 'React Native Hold Menu',
      items: [
        {
          to: 'docs/',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/enesozturk/react-native-hold-menu',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/enesozturk/react-native-hold-menu/tree/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
