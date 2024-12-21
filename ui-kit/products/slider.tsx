import Image from 'next/image';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import { Product } from 'swagger/services';
import { handlePagination } from './helpers';
import {
  UseImagePaginat,
  handleDragEnd,
} from 'components/store/storeLayout/helpers';
import { sizesNum } from 'components/store/lib/Devices';

import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import {
  clearSearchProducts,
  clearSearchQuery,
} from 'redux/slicers/store/globalSlicer';
import { SWIPE_CONFIDENCE_THRESHOLD } from './constants';
import ZoomFullScreen from 'ui-kit/ZoomFullScreen';
import styles from './styles/slider.module.css';

type Props = {
  url?: string;
  images: string[];
  product: Product;
  windowWidth: number;
  zoom?: boolean;
  setZoom?: any;
  imageIndex?: any;
  setZoomImgSrc?: any;
  zoomImgSrc?: string;
};

const Slider: React.FC<Props> = ({ product, url, images, windowWidth }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, images.length, page);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [zoomImgSrc, setZoomImgSrc] = useState(images[imageIndex]);
  const [zoom, setZoom] = useState(false);
  const [loadingComplet, setLoadingComplet] = useState(false);
  const calculateImageSize = (windowWidth: number) => {
    switch (true) {
      // laptopM
      case sizesNum.laptopS < windowWidth && windowWidth < sizesNum.laptopM:
        return {
          minMaxheight: windowWidth / 3 - 90,
          minMaxWidth: windowWidth / 3 - 70,
          width: 100,
        };
      // laptopS
      case sizesNum.tabletL < windowWidth && windowWidth < sizesNum.laptopS:
        return {
          minMaxheight: windowWidth / 2 - 90,
          minMaxWidth: windowWidth / 2 - 70,
          width: 100,
        };
      // tabletL
      case sizesNum.tabletS < windowWidth && windowWidth < sizesNum.tabletL:
        return {
          minMaxheight: windowWidth / 2 - 90,
          minMaxWidth: windowWidth / 2 - 70,
          width: 100,
        };
      // tabletS, mobileL, mobileM, mobileS, mobileES
      case sizesNum.mobileES < windowWidth && windowWidth < sizesNum.tabletS:
        return {
          minMaxheight: windowWidth - 100,
          minMaxWidth: windowWidth - 100,
          width: 100,
        };
      default:
        return {
          minMaxWidth: 300,
          minMaxheight: 300,
          width: 100,
        };
    }
  };

  const [wrapperSizes, setWrapperSizes] = useState({
    minMaxWidth: calculateImageSize(windowWidth).minMaxWidth,
    minMaxheight: calculateImageSize(windowWidth).minMaxheight,
    width: calculateImageSize(windowWidth).width,
  });
  useEffect(() => {
    setWrapperSizes({
      minMaxWidth: calculateImageSize(windowWidth).minMaxWidth,
      minMaxheight: calculateImageSize(windowWidth).minMaxheight,
      width: calculateImageSize(windowWidth).width,
    });
  }, [windowWidth]);

  // --------------------------------------------
  useEffect(() => {
    function hideOnClickOutside(element1, element2) {
      const outsideClickListener = (event) => {
        if (
          !element1.contains(event.target) &&
          !element2.contains(event.target) &&
          isVisible(element1) &&
          isVisible(element2)
        ) {
          setZoom(false);
        }
      };
      document.addEventListener('click', outsideClickListener);
    }

    const isVisible = (elem) =>
      !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

    setTimeout(() => {
      if (zoom) {
        let zoomImg = document.querySelector('.ant-image-preview-img');
        let zoomCtr = document.querySelector('.ant-image-preview-operations');
        hideOnClickOutside(zoomImg, zoomCtr);
      }
    }, 300);
  }, [zoom]);

  return (
    <>
      <div
        style={{
          minWidth: `${wrapperSizes.minMaxWidth}px`,
          maxWidth: `${wrapperSizes.minMaxWidth}px`,
          minHeight: `${wrapperSizes.minMaxheight}px`,
          maxHeight: `${wrapperSizes.minMaxheight}px`,
          width: `${wrapperSizes.width}%`,
        }}
        className={styles.ImageSliderWrapper}
      >
        <Link
          onClick={() => {
            dispatch(clearSearchQuery());
            dispatch(clearSearchProducts());
          }}
          href={`/product/${url}`}
          aria-label={product.name}
          prefetch={false}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={`slider-image${imageIndex}`}
              custom={direction}
              variants={variants.slider}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd(
                paginateImage,
                SWIPE_CONFIDENCE_THRESHOLD,
              )}
              className={styles.ImageSliderSlide}
            >
              <div
                className={styles.LoaderMask}
                style={{ display: loadingComplet ? 'none' : 'flex' }}
              />
              <Image
                className={styles.ImageSlider}
                style={{
                  opacity: loadingComplet ? 1 : 0,
                  position: loadingComplet ? 'inherit' : 'absolute',
                  zIndex: loadingComplet ? 1 : -1,
                }}
                alt={`${product.name}`}
                src={`/api/images/${images[imageIndex]}`}
                width={0}
                height={0}
                sizes="100vw"
                loading="lazy"
                priority={false}
                onLoadingComplete={() => setLoadingComplet(true)}
              />
            </motion.div>
          </AnimatePresence>

          {windowWidth > 1024 ? (
            <ul className={styles.image_scroll_wrapper}>
              {images.map((images, index) => {
                return (
                  <li
                    onMouseOver={() =>
                      handlePagination(
                        index,
                        currentSlide,
                        setCurrentSlide,
                        paginateImage,
                      )
                    }
                    key={index}
                    className={styles.image_index}
                  ></li>
                );
              })}
            </ul>
          ) : (
            <ul className={styles.image_indecator_mobile}>
              {images.map((image, index) => {
                return (
                  <li
                    key={index}
                    className={styles.indecator}
                    style={{
                      backgroundColor:
                        imageIndex == index ? '#000000' : 'transparent',
                    }}
                  ></li>
                );
              })}
            </ul>
          )}
        </Link>
        <div className={styles.ImageZoomButtonWrapper}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setZoom(true);
              setZoomImgSrc(`/api/images/${images[imageIndex]}`);
              setTimeout(() => {
                const btnImg: any =
                  document.querySelector('.hidden-image-zoom');
                btnImg.click();
              }, 300);
            }}
            className={styles.ImageZoomButton}
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="zoom-in"
              width="1em"
              height="1em"
              fill="white"
              aria-hidden="true"
            >
              <path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path>
            </svg>
          </button>
        </div>
        {zoom ? <ZoomFullScreen zoomImgSrc={zoomImgSrc} /> : ''}
      </div>
    </>
  );
};

export default Slider;
