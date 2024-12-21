import { navigateTo } from 'common/helpers';
import { NextRouter } from 'next/router';
import { signout } from 'redux/slicers/authSlicer';
import { AppDispatch } from 'redux/store';
import { Page, paths } from 'routes/constants';

import { pathWords } from './constants';
import { TMenuItem } from './types';

const getPathname = (router: NextRouter, pathIndex: number): string => {
  const arr = router.route.substring(1).split('/');
  let str;
  switch (pathIndex) {
    case 1:
      str = arr[1];
      break;
    case 2:
      str = `${arr[1]}/${arr[2]}`;
      break;
    case 3:
      str = `${arr[1]}/${arr[2]}/${arr[3]}`;
      break;
  }
  return str;
};

export const currentPath = (router: NextRouter, pathIndex: number): string => {
  const lastPathname = getPathname(router, pathIndex);
  return pathWords[lastPathname];
};

export const handleSelect = (router: NextRouter) => (route: any) => {
  router.push(route.key);
};

export const getSelectedKeys = (pathname: string) => {
  const entry = Object.values(paths).find(
    (path) => path !== paths[Page.HOME] && pathname.includes(path),
  );
  return entry ? [entry] : [];
};

export const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: TMenuItem[],
): TMenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as TMenuItem;
};

export const handleLogout =
  (router: NextRouter, dispatch: AppDispatch) => async () => {
    await dispatch(signout());
    navigateTo(router, Page.ADMIN_LOGIN)();
  };

export const handleGetSecondHref = (router: NextRouter): string => {
  const refArr = router.pathname.split('/');
  const lastElement = refArr[refArr.length - 2];
  if (refArr.length >= 4 && lastElement !== 'analytics') {
    refArr.splice(3);
    return refArr.join('/');
  } else {
    return router.pathname;
  }
};
