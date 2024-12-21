module.exports = {
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
  images: {
    // domains: ['avatars.dicebear.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.dicebear.com',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/fonts/circe/circe-regular.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/circe/circe-extra-bold.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/circe/circe-bold.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/tt-ricordi-marmo-trial-variable.woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/Jost/Jost-Regular.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/icons/back_arrow.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design',
    '@rc-component',
    'antd',
    'rc-cascader',
    'rc-checkbox',
    'rc-collapse',
    'rc-dialog',
    'rc-drawer',
    'rc-dropdown',
    'rc-field-form',
    'rc-image',
    'rc-input',
    'rc-input-number',
    'rc-mentions',
    'rc-menu',
    'rc-motion',
    'rc-notification',
    'rc-pagination',
    'rc-picker',
    'rc-progress',
    'rc-rate',
    'rc-resize-observer',
    'rc-segmented',
    'rc-select',
    'rc-slider',
    'rc-steps',
    'rc-switch',
    'rc-table',
    'rc-tabs',
    'rc-textarea',
    'rc-tooltip',
    'rc-tree',
    'rc-tree-select',
    'rc-upload',
    'rc-util',
  ],
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = withBundleAnalyzer(nextConfig);
