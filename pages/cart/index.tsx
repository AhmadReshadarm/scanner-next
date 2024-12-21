import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import Head from 'next/head';
import { baseUrl } from 'common/constant';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
const Cart = dynamic(() => import('components/store/cart'), {
  ssr: false,
  loading: () => <LoaderMask />,
});

const CardPage = () => {
  return (
    <>
      <Head>
        <title>Корзина | NBHOZ</title>
        <meta
          property="og:image"
          name="og:image"
          content={`${baseUrl}/static/logo_800x800.png`}
        />
      </Head>
      <Container
        variants={variants.fadInOut}
        key="container-home-banners"
        initial="start"
        animate="middle"
        exit="end"
      >
        <Cart />
      </Container>
    </>
  );
};
const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

CardPage.PageLayout = StoreLayout;
export default CardPage;
