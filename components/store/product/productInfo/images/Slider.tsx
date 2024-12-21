import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { handleDragEnd } from './helpers';
import { SWIPE_CONFIDENCE_THRESHOLD } from '../../constants';
import { useEffect, useState } from 'react';
import ZoomFullScreen from 'ui-kit/ZoomFullScreen';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import styles from '../../styles/images.module.css';
type Props = {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: any;
  direction: number;
  page: number;
  paginateImage: any;
  alt: any;
  base64Image: any;
};

const Slider: React.FC<Props> = ({
  images,
  selectedIndex,
  setSelectedIndex,
  direction,
  page,
  paginateImage,
  alt,
  base64Image,
}) => {
  const [zoomImgSrc, setZoomImgSrc] = useState(images[selectedIndex]);
  const [zoom, setZoom] = useState(false);

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
    <div className={styles.SliderWrapper}>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={page}
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
            images.length - 1,
            setSelectedIndex,
            selectedIndex,
          )}
          draggable={true}
          className={styles.SliderSlide}
        >
          <Image
            src={images[selectedIndex]}
            alt={alt}
            itemProp="contentUrl"
            width={1080}
            height={1080}
            priority={true}
            placeholder="blur"
            blurDataURL={base64Image}
            className={styles.SliderImage}
          />
        </motion.div>
      </AnimatePresence>

      <ul className={styles.image_indecator_mobile}>
        {images.map((image, index) => {
          return (
            <li
              key={index}
              className={styles.indecator}
              style={{
                backgroundColor:
                  selectedIndex == index ? '#000000' : 'transparent',
              }}
            ></li>
          );
        })}
      </ul>

      <div className={styles.ImageZoomButtonWrapper}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setZoom(true);
            setZoomImgSrc(images[selectedIndex]);
            setTimeout(() => {
              const btnImg: any = document.querySelector('.hidden-image-zoom');
              btnImg.click();
            }, 300);
          }}
          className={styles.ImageZoomButton}
          title="Увеличить до полного экрана"
          type="button"
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
  );
};

export default Slider;
