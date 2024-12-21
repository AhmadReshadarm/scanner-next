import { Carousel, Image, Spin } from 'antd';
import { imageFallback } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import styles from './index.module.scss';
import { fetchSlides, clearBanners } from 'redux/slicers/bannersSlicer';
import { useEffect } from 'react';

const SlidesTab = () => {
  const dispatch = useAppDispatch();
  const slides = useAppSelector((state) => state.banners.slides);
  const loading = useAppSelector((state) => state.banners.loading);

  useEffect(() => {
    dispatch(fetchSlides());
    return () => {
      dispatch(clearBanners());
    };
  }, []);
  return (
    <>
      {loading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <div>
          <CarouselWrapper>
            {slides?.map((slide) => {
              return (
                <div key={slide?.id}>
                  <a href={'https://nbhoz.ru' + slide?.link}>
                    <Image
                      className={styles.bannersTab__slidesImageContainer__image}
                      preview={false}
                      src={`/api/images/${slide?.image}`}
                      fallback={imageFallback}
                    />
                  </a>
                </div>
              );
            })}
          </CarouselWrapper>
        </div>
      )}
    </>
  );
};
const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    height: 5px;
    background: #f0f2f5;
    border: 1px solid #002140;
  }
  > .slick-dots li.slick-active button {
    background: #f0f2f5;
    border: 1px solid #002140;
  }
`;
export default SlidesTab;
