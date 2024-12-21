import { devices } from 'components/store/lib/Devices';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
import styled from 'styled-components';
import { getAnimationDelay } from 'ui-kit/products/helpers';
import ProductItem from 'ui-kit/products/productItem';
import { useInViewport } from 'components/store/storeLayout/useInViewport';
import { fetchBestProducts } from 'redux/slicers/store/globalSlicer';
import Loader from 'ui-kit/products/Loader';

type Props = {};

const BestProduct: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { isInViewport, ref } = useInViewport();
  useEffect(() => {
    const payload = {
      tags: ['best_product'],
      limit: '1000',
    };
    isInViewport && dispatch(fetchBestProducts(payload));
  }, [isInViewport]);
  let delay: number[] = [];
  const { bestProduct, loading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );

  useEffect(() => {
    if (bestProduct) {
      delay = getAnimationDelay(bestProduct.length);
    }
  }, [bestProduct]);

  return (
    <>
      <Container ref={ref}>
        <Wrapper>
          {isInViewport ? (
            <>
              {!loading && bestProduct ? (
                <>
                  <div className="section-title-wrapper">
                    <h1>ГОРЯЧИЕ ПРОДАЖИ</h1>
                  </div>
                  <ul className="best-product-grid-wrapper">
                    {bestProduct.map((product, index) => {
                      return (
                        <ProductItem
                          key={`best-product${index}`}
                          product={product}
                          custom={delay[index]}
                        />
                      );
                    })}
                  </ul>
                </>
              ) : (
                <Loader />
              )}
            </>
          ) : (
            <Loader />
          )}
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 80px 0;
  @media ${devices.laptopL} {
    padding: 70px 0;
  }
  @media ${devices.laptopM} {
    padding: 60px 0;
  }
  @media ${devices.laptopS} {
    padding: 50px 0;
  }
  @media ${devices.tabletL} {
    padding: 40px 0;
  }
  @media ${devices.tabletS} {
    padding: 30px 0;
  }
  @media ${devices.mobileL} {
    padding: 20px 0;
  }
  @media ${devices.mobileM} {
    padding: 10px 0;
  }
  @media ${devices.mobileS} {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .section-title-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0 50px 0;
    h1 {
      font-size: 3rem;
      font-family: var(--font-ricordi);
      text-align: center;
    }
  }
  .best-product-grid-wrapper {
    width: 100%;
    display: inline-grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 50px;
    row-gap: 30px;
    padding: 10px;
    justify-items: center;
  }
  @media ${devices.laptopL} {
    max-width: 1230px;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media ${devices.laptopM} {
    max-width: 1230px;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 40px;
    }
  }
  @media ${devices.laptopS} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 5px;
    }
    .section-title-wrapper {
      h1 {
        font-size: 2.5rem;
      }
    }
  }
  @media ${devices.tabletL} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 10px;
    }
    .section-title-wrapper {
      h1 {
        font-size: 2rem;
      }
    }
  }
  @media ${devices.tabletS} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(1, 1fr);
      column-gap: 10px;
    }
    .section-title-wrapper {
      h1 {
        font-size: 1.8rem;
      }
    }
  }
  @media ${devices.mobileL} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(1, 1fr);
      column-gap: 10px;
    }
    .section-title-wrapper {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
  @media ${devices.mobileM} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
    .section-title-wrapper {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
  @media ${devices.mobileS} {
    max-width: unset;
    .best-product-grid-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
    .section-title-wrapper {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default BestProduct;
