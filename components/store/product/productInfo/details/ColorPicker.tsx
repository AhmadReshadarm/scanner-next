import color from 'components/store/lib/ui.colors';
import { getFlatVariantImages, ImageTooltip } from './helpers';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Color, ProductVariant } from 'swagger/services';
import { useAppDispatch } from 'redux/hooks';
import { setVariant } from 'redux/slicers/store/cartSlicer';
import Image from 'next/image';
import styles from '../../styles/detail.module.css';

type Props = {
  variantColor: Color | undefined;
  productVariants: ProductVariant[] | undefined;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const ColorPicker: React.FC<Props> = ({
  variantColor,
  productVariants,
  selectedIndex,
  setSelectedIndex,
  paginateImage,
}) => {
  const dispatch = useAppDispatch();

  const handleImageChange =
    (
      variant: ProductVariant,
      index: number,
      selectedIndex: number,
      setSelectedIndex: (index: number) => void,
      paginateImage: (index: number) => void,
    ) =>
    () => {
      dispatch(setVariant(variant));
      setSelectedIndex(index);

      if (index != selectedIndex) {
        paginateImage(selectedIndex > index ? -1 : 1);
      }
    };

  const variantImages = getFlatVariantImages(productVariants);

  const [initialVariant, setInitialVariant] = useState(productVariants![0]);
  useEffect(() => {
    dispatch(setVariant(initialVariant));
  }, []);
  const [loadingComplet, setLoadingComplet] = useState(false);

  return (
    <div className={styles.ColorPickerContainer}>
      <ul className={styles.ColorPickerList}>
        {variantImages?.map((variant, colIndex) => {
          if (!initialVariant) setInitialVariant(variant);

          return (
            <ImageTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key={`image-item-${colIndex}`}
              title={
                <React.Fragment>
                  <Image
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                    }}
                    src={`/api/images/${variant.image}`}
                    alt={`${variant.image}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    loading="lazy"
                    priority={false}
                  />
                  <hr
                    style={{
                      backgroundColor: color.textTertiary,
                      width: '100%',
                    }}
                  />
                  {variantColor?.url === '_' ||
                  variantColor?.url === '-' ||
                  variantColor?.url == ' ' ? (
                    ''
                  ) : (
                    <span
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                      className={styles.ColorPickerSpan}
                    >
                      <span>Цвет:</span>
                      <div
                        style={{ backgroundColor: variant.color.code! }}
                        className={styles.ColorItem}
                      />
                    </span>
                  )}
                  <div className={styles.ArticalWrapper}>
                    <span>Артикул:</span>
                    <span>
                      {variant.artical.includes('|')
                        ? variant.artical.split('|')[0].toLocaleUpperCase()
                        : variant.artical.toLocaleUpperCase()}
                    </span>
                  </div>
                  {variant.artical.includes('|') ? (
                    <div className={styles.ArticalWrapper}>
                      <span>
                        {variant.artical.split('|')[1].toLocaleUpperCase()}
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                  {!variant.available ? (
                    <span className={styles.ColorPickerSpan}>
                      Нет в наличии
                    </span>
                  ) : (
                    <div className={styles.ColorPickerPriceWrapper}>
                      <span className={styles.ColorPickerSpan}>
                        {variant.price} ₽
                      </span>
                    </div>
                  )}
                </React.Fragment>
              }
            >
              <li className={styles.ColorPickerThumbnailWrapper}>
                <div
                  className={styles.ColorPickerItems}
                  onClick={handleImageChange(
                    variant,
                    colIndex,
                    selectedIndex,
                    setSelectedIndex,
                    paginateImage,
                  )}
                  onTouchStart={handleImageChange(
                    variant,
                    colIndex,
                    selectedIndex,
                    setSelectedIndex,
                    paginateImage,
                  )}
                  style={{
                    border:
                      selectedIndex == colIndex
                        ? `solid 1px ${color.searchBtnBg}`
                        : 'none',
                  }}
                >
                  <div
                    style={{ display: loadingComplet ? 'none' : 'flex' }}
                    className={styles.LoaderMask}
                  />
                  <Image
                    style={{
                      width: selectedIndex == colIndex ? '48px' : '50px',
                      height: selectedIndex == colIndex ? '48px' : '50px',

                      opacity: loadingComplet ? 1 : 0,
                      position: loadingComplet ? 'inherit' : 'absolute',
                      zIndex: loadingComplet ? 1 : -1,
                    }}
                    src={`/api/images/compress/${variant.image}?qlty=10&width=50&height=50&lossless=true`} // `/api/images/${variant.image}`
                    // src={`/api/images/${variant.image}`}
                    alt={variant.image}
                    width={50}
                    height={50}
                    loading="lazy"
                    priority={false}
                    onLoadingComplete={() => setLoadingComplet(true)}
                  />
                  {!variant.available ? (
                    <div className={styles.not_available_mask}>
                      <div className={styles.inner_not_available_mask}></div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <span className={styles.preview_artical}>
                  {variant.artical.includes('|')
                    ? variant.artical.split('|')[0].toLocaleUpperCase()
                    : variant.artical.includes(' ')
                    ? variant.artical.split(' ')[0].toLocaleUpperCase()
                    : variant.artical.toLocaleUpperCase()}
                </span>
              </li>
            </ImageTooltip>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorPicker;
