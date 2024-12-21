import { useAppSelector } from 'redux/hooks';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { useEffect, useState } from 'react';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import { TCartState } from 'redux/types';
import Link from 'next/link';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { Product } from 'swagger/services';
import styles from '../styles/productSlider.module.css';
import Image from 'next/image';
type Props = {
  caroselProducts: Product[];
  base64Image: any;
};
const ProductsSlider: React.FC<Props> = ({ caroselProducts, base64Image }) => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);

  // ------------------- UI hooks --------------------------------

  const [caroselIndex, setCaroselIndex] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [isMouseHover, setISMouseHover] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (caroselProducts.length - 1 > caroselIndex && !isMouseHover) {
        setCaroselIndex(caroselIndex + 1);
      }
      if (caroselProducts.length - 1 <= caroselIndex && !isMouseHover) {
        setCaroselIndex(0);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [caroselIndex, isMouseHover]);

  return (
    <div
      className={styles.Container}
      onMouseEnter={() => {
        setISMouseHover(true);
      }}
      onMouseLeave={() => {
        setISMouseHover(false);
      }}
      onTouchStart={() => {
        setISMouseHover(true);
        setISMouseHover(true);
      }}
      onTouchEnd={() => {
        setISMouseHover(false);
      }}
    >
      <div className={styles.Wrapper}>
        <>
          {caroselProducts.map((product, index) => {
            const images = getProductVariantsImages(product?.productVariants);
            return (
              <>
                {caroselIndex === index ? (
                  <div className={styles.Content}>
                    <div className={styles.product_cart_wrapper}>
                      <div
                        className={styles.cart_title_n_action_buttons_wrapper}
                      >
                        <div
                          className={styles.cart_title_n_action_buttons_content}
                        >
                          <div
                            className={
                              styles.title_n_index_indecator_top_wrapper
                            }
                          >
                            <div className={styles.index_indecator_top} />
                            <Link
                              href={`/product/${product?.url}`}
                              prefetch={false}
                              title={`Перейти к товар ${product.name}`}
                            >
                              <h1 title={product?.name}>{`${
                                product?.name?.length! > 40
                                  ? product?.name?.slice(0, 40) + '...'
                                  : product?.name
                              }`}</h1>
                            </Link>
                          </div>
                          <div className={styles.description_mobile}>
                            <p>
                              {product?.desc?.includes('|')
                                ? product?.desc?.split('|')[0]?.length! > 150
                                  ? product?.desc?.split('|')[0].slice(0, 150) +
                                    '...'
                                  : product?.desc?.split('|')[0]
                                : product?.desc?.length! > 150
                                ? product?.desc?.slice(0, 150) + '...'
                                : product?.desc?.slice(0, 150)}
                            </p>
                          </div>
                          <div
                            className={
                              styles.cart_price_n_action_button_wrapper
                            }
                          >
                            <div className={styles.artical_Wrapper}>
                              <span>Артикул: </span>
                              <span>
                                {product?.productVariants![0].artical!.toLocaleUpperCase()}
                              </span>
                            </div>
                            <div className={styles.price_wrapper}>
                              {product?.productVariants![0].oldPrice ? (
                                <span className={styles.old_price}>
                                  {`${product?.productVariants![0].oldPrice}`} ₽
                                </span>
                              ) : (
                                ''
                              )}
                              <span>
                                {`${product?.productVariants![0].price}`} ₽
                              </span>
                            </div>
                            <div className={styles.action_buttons_wrapper}>
                              <AddToWishlist product={product!} />
                              <AddToCart
                                product={product!}
                                qty={findCartQTY(product, cart!)}
                                variant={product?.productVariants![0]}
                              />
                            </div>
                          </div>
                          <div className={styles.dots_indecator_wrapper}>
                            {caroselProducts.map((product, index) => {
                              return (
                                <span
                                  className={`${styles.dots_indecator} ${
                                    caroselIndex == index ? styles.active : ''
                                  }`}
                                  onClick={() => {
                                    setCaroselIndex(index);
                                    setISMouseHover(true);
                                  }}
                                ></span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/product/${product?.url}`}
                        prefetch={false}
                        title={`Перейти к товар ${product.name}`}
                      >
                        <div className={styles.cart_image_wrapper}>
                          <ul className={styles.images_scroll_wrapper}>
                            {images.map((image, index) => {
                              return (
                                <li
                                  onMouseOver={() => {
                                    setImageIndex(index);
                                  }}
                                  className={styles.image_index}
                                ></li>
                              );
                            })}
                          </ul>
                          <Image
                            className="product-slider-img"
                            src={`/api/images/${images[imageIndex]}`}
                            alt={product?.name!}
                            width={1080}
                            height={1080}
                            priority={true}
                            placeholder="blur"
                            blurDataURL={base64Image}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className={styles.product_description_wrapper}>
                      <div className={styles.indecator_wrapper}>
                        <div className={styles.index_indecator_top}></div>
                      </div>
                      <Link
                        href={`/product/${product?.url}`}
                        prefetch={false}
                        title={`Перейти к товар ${product.name}`}
                      >
                        <h1 title={product?.name}>{`${
                          product?.name?.length! > 40
                            ? product?.name?.slice(0, 40) + '...'
                            : product?.name
                        }`}</h1>
                      </Link>
                      <div className={styles.artical_Wrapper}>
                        <span>Артикул: </span>
                        <span>
                          {product?.productVariants![0].artical!.toLocaleUpperCase()}
                        </span>
                      </div>
                      <span>
                        {product?.desc?.includes('|')
                          ? product?.desc?.split('|')[0]?.length! > 150
                            ? product?.desc?.split('|')[0].slice(0, 150) + '...'
                            : product?.desc?.split('|')[0]
                          : product?.desc?.length! > 150
                          ? product?.desc?.slice(0, 150) + '...'
                          : product?.desc?.slice(0, 150)}
                      </span>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default ProductsSlider;
