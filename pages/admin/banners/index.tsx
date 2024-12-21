import { Button } from 'antd';
import { navigateTo } from 'common/helpers';
import AdminLayout from 'components/admin/adminLayout/layout';
import { useRouter } from 'next/router';
import { Page } from 'routes/constants';
import styles from './index.module.scss';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const BannersLayout = dynamic(
  () => import('components/admin/banners/BannersLayout'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);

const BannersPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Баннеры | NBHOZ</title>
      </Head>
      <div className={styles.bannersHeader}>
        <h1 className={styles.bannersHeader__title}>Баннеры</h1>
        <Button
          className={styles.bannersHeader__createBannerButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_UPDATE_BANNERS)}
        >
          Обновить контент
        </Button>
      </div>
      <BannersLayout />
    </>
  );
};

BannersPage.PageLayout = AdminLayout;

export default BannersPage;
