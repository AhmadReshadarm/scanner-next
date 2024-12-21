import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { YMaps } from 'react-yandex-maps';
import Image from 'next/image';
import styled from 'styled-components';
import { baseUrl } from 'common/constant';
import { TCartState } from 'redux/types';
import { useRouter } from 'next/router';
import { fetchCart } from 'redux/slicers/store/cartSlicer';
import { openErrorNotification } from 'common/helpers';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const CheckoutContent = dynamic(() => import('components/store/checkout'), {
  ssr: false,
  loading: () => <LoaderMask />,
});

const Checkout = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isClient, setClient] = useState(false);
  const [oneTimeNotification, setOneTimeNotification] = useState(false);
  const getBasketId = () => {
    return localStorage.getItem('basketId');
  };
  useEffect(() => {
    if (cart?.orderProducts?.length == 0 && !oneTimeNotification) {
      setOneTimeNotification(true);
      openErrorNotification('Ваша корзина пуста');
      router.push('/catalog');
    }
  }, [cart]);
  useEffect(() => {
    const baksetId: any = getBasketId();
    dispatch(fetchCart(baksetId));
  }, [isClient]);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <YMaps
        query={{
          apikey: '92d38bbd-1ea5-438f-b3bc-6a74d7658532',
          lang: 'ru_RU',
        }}
      >
        <Head>
          <title>Оформить заказ | Nbhoz</title>
          <meta
            property="og:image"
            name="og:image"
            content={`${baseUrl}/static/logo_800x800.png`}
          />
        </Head>

        {isClient ? (
          <Container
            key="container-checkout"
            flex_direction="row"
            justify_content="center"
            align_items="center"
            padding="20px 0"
            bg_color={color.bgProduct}
            initial="start"
            animate="middle"
            exit="exit"
            variants={variants.fadInOut}
          >
            <Wrapper gap={'20px'}>
              <Content
                flex_direction="column"
                justify_content="space-between"
                align_items="center"
              >
                <Header>
                  <Image
                    src="/static/secure-badge.png"
                    alt=""
                    width={80}
                    height={80}
                  />
                </Header>
                <CheckoutContent />
              </Content>
            </Wrapper>
          </Container>
        ) : (
          <LoaderMask />
        )}
        {/* <Footer /> */}
      </YMaps>
    </>
  );
};

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

Checkout.PageLayout = StoreLayout;
export default Checkout;
