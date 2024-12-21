import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { Container } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import dynamic from 'next/dynamic';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import Head from 'next/head';
const ReviewsItems = dynamic(() => import('components/store/reviews'), {
  ssr: false,
  loading: () => <LoaderMask />,
});
const Reviews = () => {
  return (
    <>
      <Head>
        <title>Отзывов | NBHOZ</title>
      </Head>
      <Container
        variants={variants.fadInOut}
        key="profile-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        bg_color={color.textPrimary}
      >
        <ReviewsItems />
      </Container>
    </>
  );
};

Reviews.PageLayout = StoreLayout;

export default Reviews;
