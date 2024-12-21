import AdminLayout from 'components/admin/adminLayout/layout';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const BannersFormLayout = dynamic(
  () => import('components/admin/banners/BannersFormLayout'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);

import styles from '../index.module.scss';

const UpdateBanner = () => {
  return (
    <>
      <div>
        <h1 className={styles.bannersHeader__title}>Обновление баннеров</h1>
      </div>
      <div>
        <BannersFormLayout />
      </div>
    </>
  );
};

UpdateBanner.PageLayout = AdminLayout;

export default UpdateBanner;
