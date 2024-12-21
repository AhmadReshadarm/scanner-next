import AdminLayout from 'components/admin/adminLayout/layout';
import { devices } from 'components/store/lib/Devices';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProduct } from 'redux/slicers/store/productInfoSlicer';
import { TProductInfoState } from 'redux/types';
import styled from 'styled-components';
import Review from 'components/store/product/reviewsAndQuastions/reviews/Reviews';
import Head from 'next/head';

const ProductReviewsPage = () => {
  const { product } = useAppSelector<TProductInfoState>(
    (state) => state.productInfo,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchProduct(router.query.id as string));
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Отзывы {`>`} редактирование обзора | NBHOZ
        </title>
      </Head>
      <ContentContainer>
        <ContentWrapper style={{ alignItems: 'flex-start' }}>
          <Review product={product} />
        </ContentWrapper>
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;

  @media ${devices.laptopS} {
    display: flex;
    flex-direction: column-reverse;
  }

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px 0;
  gap: 20px;
  position: relative;

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

ProductReviewsPage.PageLayout = AdminLayout;

export default ProductReviewsPage;
