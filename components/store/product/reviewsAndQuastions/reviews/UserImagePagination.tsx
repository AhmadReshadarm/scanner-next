import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import React from 'react';
import { devices } from 'components/store/lib/Devices';

const UserImagePicker = ({
  images,
  // imagesData,
  selectedIndex,
  paginate,
  // setImagesData,
  setSelectedIndex,
}) => {
  return (
    <UserImageList>
      {images.map((image, index) => {
        return (
          <UserImageItems
            key={`user-review-image-${index}`}
            custom={index * 0.001}
            initial="init"
            whileInView="animate"
            variants={variants.fadInSlideUp}
            onClick={() => {
              setSelectedIndex(index);
              if (index != selectedIndex) {
                paginate(index > selectedIndex ? 1 : -1);
              }
            }}
          >
            <motion.img
              custom={index * 0.005}
              initial="init"
              animate="animate"
              variants={variants.slideInFromRigh}
              style={{
                width: '100px',
                height: '100px',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                borderRadius: '10px',
              }}
              src={`/api/images/${image}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/img_not_found.png';
              }}
            />
          </UserImageItems>
        );
      })}
      {/* {imagesData != null ? (
        <UserImageItems
          whileHover="hover"
          whileTap="tap"
          custom={1.1}
          variants={variants.grow}
          // onClick={() => setImagesData(imagesData + 1)}
        >
          <span>Еще...</span>
        </UserImageItems>
      ) : (
        ''
      )} */}
    </UserImageList>
  );
};

const UserImageList = styled.ul`
  width: 100%;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  align-items: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
  user-select: none;
  padding: 10px;

  @media ${devices.laptopS} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column;
  }
`;

const UserImageItems = styled(motion.li)`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #e5f2ff;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  cursor: pointer;
  border-radius: 10px;
  span {
    padding: 20px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

export default UserImagePicker;
