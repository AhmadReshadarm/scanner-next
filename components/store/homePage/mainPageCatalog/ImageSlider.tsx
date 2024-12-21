import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryInTree } from 'swagger/services';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import Image from 'next/image';

type Props = {
  categories: CategoryInTree[];
  index: number;
  page: any;
  direction: any;
};

const ImageSlider: React.FC<Props> = ({
  categories,
  index,
  page,
  direction,
}) => {
  return (
    <ImageSliderWrapper>
      <AnimatePresence initial={false} custom={direction}>
        <SliderSlide
          custom={direction}
          variants={variants.slider}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          key={page}
        >
          <Slider
            alt={`${categories[index]?.name!}`}
            src={`/api/images/${categories[index]?.image}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/img_not_found.png';
            }}
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
          />
        </SliderSlide>
      </AnimatePresence>
    </ImageSliderWrapper>
  );
};

const ImageSliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  min-height: 650px;
  max-height: 650px;
  @media ${devices.laptopS} {
    display: none;
  }
  @media ${devices.tabletL} {
    display: none;
  }
  @media ${devices.tabletS} {
    display: none;
  }
  @media ${devices.mobileL} {
    display: none;
  }
  @media ${devices.mobileM} {
    display: none;
  }
  @media ${devices.mobileS} {
    display: none;
  }
`;

const Slider = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SliderSlide = styled(motion.div)`
  width: 80%;
  height: 100%;
  position: absolute;
  right: 50px;
  top: 0;
`;

export default ImageSlider;
