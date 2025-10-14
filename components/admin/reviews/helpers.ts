import { NextRouter } from 'next/router';
import { Page, paths } from 'routes/constants';

const handleRedirectProductDetail = (url: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_REVIEWS]}/${url}`);
};

export { handleRedirectProductDetail };
