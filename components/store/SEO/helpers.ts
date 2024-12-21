import { baseUrl } from 'common/constant';

const settings = {
  graphql: {
    uri: baseUrl,
  },
  meta: {
    rootUrl: baseUrl,
    title: 'NBHOZ.ru',
    description:
      'NBHOZ, Дешевые хозтовары оптом в интернет магазине nbhoz в Москва и все Россия, купить Кухонная утварь, Товары для сервировки стола, Товары для ванной комнаты',
    social: {
      graphic:
        'https://cheatcode-assets.s3.amazonaws.com/default-social-graphic.png',
      twitter: '@nbhoz',
    },
  },
  routes: {
    authenticated: {
      pathAfterFailure: '/',
    },
    public: {
      pathAfterFailure: '/',
    },
  },
};

export { settings };
