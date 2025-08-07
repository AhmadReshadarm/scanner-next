const siteUrl = 'https://voodoo-iab.ru/';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/', '/*', '/admin', '/admin/*'],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`,
      `${siteUrl}/sitemap.xml`,
    ],
  },
  exclude: ['/', '/*', '/admin', '/admin/*'],
};
