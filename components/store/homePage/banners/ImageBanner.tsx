import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import { memo, useEffect, useState } from 'react';
import { SWIPE_CONFIDENCE_THRESHOLD } from './constants';
import Link from 'next/link';
import {
  UseImagePaginat,
  handleDragEnd,
} from 'components/store/storeLayout/helpers';
import { Slide } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';
import { TGlobalUIState, TGlobalState } from 'redux/types';
import styles from '../styles/banners.module.css';
import Image from 'next/image';
type Props = {
  slides: Slide[];
  base64Image_2: any;
};

const ImageBanner: React.FC<Props> = ({ slides, base64Image_2 }) => {
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const imageIndex = wrap(0, Number(slides?.length), page);

  const [isMouseHover, setISMouseHover] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMouseHover) {
        paginateImage(1);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [imageIndex, isMouseHover]);

  const {
    isCatalogOpen,
    isSearchFormActive,
    isWishlistOpen,
    isBasketOpen,
    isAuthFormOpen,
  } = useAppSelector<TGlobalUIState>((state) => state.globalUI);
  const { searchQuery } = useAppSelector<TGlobalState>((state) => state.global);

  return (
    <div
      className={styles.SliderWrapper}
      onMouseEnter={() => {
        setISMouseHover(true);
      }}
      onMouseLeave={() => {
        setISMouseHover(false);
      }}
      onTouchStart={() => {
        setISMouseHover(true);
      }}
      onTouchEnd={() => {
        const id = setTimeout(() => {
          setISMouseHover(false);
        }, 5000);
        return () => clearTimeout(id);
      }}
    >
      <Link
        href={slides![imageIndex]?.link!}
        className={styles.banner_image_link_wrapper}
        onClick={(evt) => {
          isCatalogOpen ||
          isSearchFormActive ||
          isWishlistOpen ||
          isBasketOpen ||
          isAuthFormOpen ||
          !!searchQuery
            ? evt.preventDefault()
            : '';
        }}
        style={{ background: color.backgroundSecondery }}
        prefetch={false}
        title={`Перейти в ${slides[imageIndex].link}`}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            className={styles.SliderSlide}
            key={page}
            custom={direction}
            variants={variants.slider}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.1,
              },
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd(paginateImage, SWIPE_CONFIDENCE_THRESHOLD)}
          >
            <Image
              className={`${styles.Slider} ${
                isCatalogOpen ||
                isSearchFormActive ||
                isWishlistOpen ||
                isBasketOpen ||
                isAuthFormOpen ||
                !!searchQuery
                  ? styles.isDisplay
                  : ''
              } slider-img`}
              alt={`${slides[imageIndex]?.link}`}
              src={`/api/images/${slides[imageIndex]?.image}`}
              priority={true}
              width={1920}
              height={800}
              placeholder="blur"
              blurDataURL={base64Image_2}
            />
          </motion.div>
        </AnimatePresence>

        <div className={styles.banner_arrows_wrapper}>
          <button
            className={styles.ArrowBtns}
            onClick={(e) => {
              e.preventDefault();
              paginateImage(-1);
            }}
            title="предыдущий слайд"
            aria-label="предыдущий слайд"
          >
            <span
              className={styles.ArrowSpan}
              style={{ transform: 'rotate(180deg)' }}
            >
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.3125 1.875L7.25 6.9375L2.3125 11.875"
                  stroke="white"
                  stroke-width="3.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
          <button
            className={styles.ArrowBtns}
            onClick={(e) => {
              e.preventDefault();
              paginateImage(1);
            }}
            title="следующий слайд"
            aria-label="следующий слайд"
          >
            <span
              className={styles.ArrowSpan}
              style={{ transform: 'rotate(0deg)' }}
            >
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.3125 1.875L7.25 6.9375L2.3125 11.875"
                  stroke="white"
                  stroke-width="3.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </Link>
      <div className={styles.dots_indecator_wrapper}>
        {slides
          ? slides!.map((slideImg, index) => {
              return (
                <span
                  className={`${styles.dots_indecator} ${
                    imageIndex == index ? styles.active : ''
                  }`}
                ></span>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default memo(ImageBanner);
