import StoreLayout from 'components/store/storeLayout/layouts';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TAuthState, TStoreCheckoutState } from 'redux/types';
import { useEffect, useState } from 'react';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';
import { baseUrl } from 'common/constant';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import Authorization from 'components/store/storeLayout/utils/HeaderAuth/authorize';
import { UsePagination } from 'components/store/storeLayout/utils/HeaderAuth/authorize/helpers';
import styles from '../../components/store/order/styles/main.module.css';
const Order = dynamic(() => import('components/store/order'), {
  ssr: false,
  loading: () => <LoaderMask />,
});

const Orders = () => {
  const dispatch = useAppDispatch();
  const { checkouts } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, []);

  const [activeUI, setActiveUI] = useState('auth');
  const [direction, authType, paginate] = UsePagination();
  useEffect(() => {
    if (user) {
      setActiveUI('userData');
      dispatch(fetchCheckouts());
    }
    if (!user) {
      setActiveUI('auth');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Мои заказы | NBHOZ</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>

      <div
        style={{
          display: activeUI == 'auth' ? 'flex' : 'none',
        }}
        className={styles.AuthContainer}
      >
        <div className={styles.AuthWrapper}>
          <Authorization
            direction={direction}
            authType={authType}
            paginate={paginate}
          />
        </div>
      </div>

      {/* --------------------------------------------------------- */}
      <div
        className={styles.ContainerOrders}
        style={{
          display: activeUI == 'userData' ? 'flex' : 'none',
        }}
      >
        <Order checkouts={checkouts} />
      </div>
    </>
  );
};

Orders.PageLayout = StoreLayout;

export default Orders;
