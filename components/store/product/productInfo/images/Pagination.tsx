import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { paginateHandler } from 'components/store/storeLayout/helpers';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { handlePaginate } from './helpers';
import { devices } from 'components/store/lib/Devices';

type Props = {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
  alt: any;
  isOpened: boolean;
};

const Pagination: React.FC<Props> = ({
  images,
  selectedIndex,
  setSelectedIndex,
  paginateImage,
  alt,
  isOpened,
}) => {
  const [
    setRefType,
    widthOrHeightRef,
    widthOrHeight,
    slideTo,
    paginate,
    setSlideAmount,
  ] = paginateHandler();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  useEffect(() => {
    if (windowWidth > 1024) {
      setRefType('height');
    } else {
      setRefType('width');
    }
    setSlideAmount(120);
  }, [windowWidth]);

  return (
    <ThumbnailContainer>
      {images.length > 4 || windowWidth < 750 ? (
        <>
          <ArrowBtns
            whileHover="hover"
            whileTap="tap"
            custom={1.2}
            top="-45px"
            left="35px"
            position="absolute"
            variants={variants.grow}
            className="media-css-left"
            style={{
              background: color.glassmorphismSeconderBG,
              backdropFilter: 'blur(9px)',
            }}
            onClick={() => paginate(1)}
          >
            <ArrowSpan rotate="-90">
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.3125 1.875L7.25 6.9375L2.3125 11.875"
                  stroke="black"
                  stroke-width="3.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </ArrowSpan>
          </ArrowBtns>
          <ArrowBtns
            whileHover="hover"
            whileTap="tap"
            custom={1.2}
            top="420px"
            right="35px"
            position="absolute"
            variants={variants.grow}
            className="media-css-right"
            style={{
              background: color.glassmorphismSeconderBG,
              backdropFilter: 'blur(9px)',
            }}
            onClick={() => paginate(-1)}
          >
            <ArrowSpan rotate="90">
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.3125 1.875L7.25 6.9375L2.3125 11.875"
                  stroke="black"
                  stroke-width="3.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </ArrowSpan>
          </ArrowBtns>
        </>
      ) : (
        ''
      )}
      <div className="thumbnail-content">
        <ThumbnailWrapper
          ref={widthOrHeightRef}
          drag={windowWidth > 1024 ? 'y' : 'x'}
          dragConstraints={{
            bottom: 0,
            top: -widthOrHeight,
            left: 0,
            right: -widthOrHeight,
          }}
          custom={slideTo}
          animate="animate"
          variants={windowWidth > 1024 ? variants.sliderY : variants.sliderX}
        >
          {images.map((image, index) => {
            return (
              <ThumbnailItem
                key={`thumbnail-wrap-${index}`}
                onClick={handlePaginate(
                  index,
                  selectedIndex,
                  setSelectedIndex,
                  paginateImage,
                )}
                animate={isOpened ? 'animate' : 'init'}
                custom={index * 0.05}
                variants={variants.fadInSlideUp}
              >
                <motion.img
                  key={`thumbnail-image-${index}`}
                  animate={isOpened ? 'animate' : 'exit'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  custom={index * 0.09}
                  variants={variants.slideInFromRigh}
                  src={`/api/images/${image}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = '/img_not_found.png';
                  }}
                  alt={alt}
                  // style={{
                  //   width: index == selectedIndex ? '90%' : '100%',
                  //   height: index == selectedIndex ? '90%' : '100%',
                  // }}
                />
              </ThumbnailItem>
            );
          })}
        </ThumbnailWrapper>
      </div>
    </ThumbnailContainer>
  );
};

const ThumbnailContainer = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  .thumbnail-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-conten: space-between;
    align-items: flex-start;
    overflow: hidden;
  }
  @media ${devices.laptopS} {
    flex-direction: row;
    width: 80%;
    height: unset;
    .thumbnail-content {
      height: unset;
      width: 100%;
    }
    .media-css-right {
      right: -40px !important;
      top: 40px !important;
      span {
        transform: rotate(0deg) !important;
      }
    }
    .media-css-left {
      left: -40px !important;
      top: 40px !important;
      span {
        transform: rotate(180deg) !important;
      }
    }
  }
  @media ${devices.tabletL} {
    flex-direction: row;
    width: 80%;
    height: unset;
    .thumbnail-content {
      height: unset;
      width: 100%;
    }
    .media-css-right {
      right: -40px !important;
      top: 40px !important;
      span {
        transform: rotate(0deg) !important;
      }
    }
    .media-css-left {
      left: -40px !important;
      top: 40px !important;
      span {
        transform: rotate(180deg) !important;
      }
    }
  }

  @media ${devices.tabletS} {
    flex-direction: row;
    width: 80%;
    height: unset;
    .thumbnail-content {
      height: unset;
      width: 100%;
    }
    .media-css-right {
      right: -40px !important;
      top: 40px !important;
      span {
        transform: rotate(0deg) !important;
      }
    }
    .media-css-left {
      left: -40px !important;
      top: 40px !important;
      span {
        transform: rotate(180deg) !important;
      }
    }
  }

  @media ${devices.mobileL} {
    flex-direction: row;
    width: 80%;
    height: unset;
    .thumbnail-content {
      height: unset;
      width: 100%;
    }
    .media-css-right {
      right: -40px !important;
      top: 40px !important;
      span {
        transform: rotate(0deg) !important;
      }
    }
    .media-css-left {
      left: -40px !important;
      top: 40px !important;
      span {
        transform: rotate(180deg) !important;
      }
    }
  }
  @media ${devices.mobileM} {
    flex-direction: row;
    width: 80%;
    height: unset;
    .thumbnail-content {
      height: unset;
      width: 100%;
    }
    .media-css-right {
      right: -30px !important;
      top: 40px !important;
      span {
        transform: rotate(0deg) !important;
      }
    }
    .media-css-left {
      left: -30px !important;
      top: 40px !important;
      span {
        transform: rotate(180deg) !important;
      }
    }
  }
  @media ${devices.mobileS} {
    flex-direction: row;
    width: 80%;
    height: unset;
    .thumbnail-content {
      height: unset;
      width: 100%;
    }
    .media-css-right {
      right: -30px !important;
      top: 40px !important;
      span {
        transform: rotate(0deg) !important;
      }
    }
    .media-css-left {
      left: -30px !important;
      top: 40px !important;
      span {
        transform: rotate(180deg) !important;
      }
    }
  }
`;

const ThumbnailWrapper = styled(motion.ul)`
  height: 100%;
  width: 106px;
  display: flex;
  flex-direction: column;
  justify-conten: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 3px;
  @media ${devices.laptopS} {
    flex-direction: row;
    width: 100%;
    height: unset;
  }
  @media ${devices.tabletL} {
    flex-direction: row;
    width: 100%;
    height: unset;
  }
  @media ${devices.tabletS} {
    flex-direction: row;
    width: 100%;
    height: unset;
  }

  @media ${devices.mobileL} {
    flex-direction: row;
    width: 100%;
    height: unset;
  }
  @media ${devices.mobileM} {
    flex-direction: row;
    width: 100%;
    height: unset;
  }

  @media ${devices.mobileS} {
    flex-direction: row;
    width: 100%;
    height: unset;
  }
`;

const ThumbnailItem = styled(motion.li)`
  min-width: 90px;
  max-width: 90px;
  min-height: 90px;
  max-height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  transition: 100ms;
  cursor: pointer;
  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 3px;
  }
  @media ${devices.tabletL} {
    img {
      width: 70px;
      height: 70px;
    }
  }
  @media ${devices.tabletS} {
    img {
      width: 70px;
      height: 70px;
    }
  }

  @media ${devices.mobileL} {
    img {
      width: 70px;
      height: 70px;
    }
  }
  @media ${devices.mobileM} {
    img {
      width: 70px;
      height: 70px;
    }
  }

  @media ${devices.mobileS} {
    img {
      width: 70px;
      height: 70px;
    }
  }
`;

export default Pagination;
