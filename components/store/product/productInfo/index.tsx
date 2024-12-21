import { MutableRefObject, useState, useEffect } from 'react';
import Images from './images';
import Details from './details';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { Product } from 'swagger/services';
import Link from 'next/link';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import Image from 'next/image';
import ShareToSocial from './details/ShareToSocial';
import DropDowns from './details/DropDowns';
import styles from '../styles/productInfoMain.module.css';
import backArrow from '../../../../public/icons/back_arrow_min.png';

type Props = {
  product?: Product;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
  base64Image: any;
  images: string[];
};

const ProductInfo: React.FC<Props> = ({
  product,
  reviewRef,
  questionRef,
  base64Image,
  images,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const [windowWidth, setWindowWidth] = useState(1025);

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
  const { variant } = useAppSelector<TCartState>((state) => state.cart);

  const [isOrderNotify, setOrderNotify] = useState(false);

  return (
    <div
      className={styles.Container}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <div className={styles.Wrapper}>
        <div
          className={styles.OrderNotifier}
          style={{ display: !isOrderNotify ? 'flex' : 'none' }}
        >
          <span className={styles.notifier_text}>
            Оформить заказ можно без оплаты и без привязки банковской карты
          </span>
          <span
            onClick={() => {
              setOrderNotify(true);
            }}
            className={styles.close_btn_wrapper}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="-1"
                x2="26.3541"
                y2="-1"
                transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="1"
                y1="-1"
                x2="26.3044"
                y2="-1"
                transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </div>
        <div className={styles.Content}>
          <div className={styles.NavWrapper}>
            <div className={styles.nav_rightWrapper}>
              <Link href="/" prefetch={false}>
                <Image
                  width={35}
                  height={15}
                  quality={20}
                  priority={false}
                  src={'/icons/back_arrow_min.png'}
                  placeholder="blur"
                  blurDataURL={backArrow}
                  alt="Back to main arrow"
                />
                <span>Обратно на главную</span>
              </Link>
              <span>/</span>
              {!!product?.category?.parent && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent.url}&page=1`}
                  prefetch={false}
                >
                  <span title={product?.category?.parent?.name}>
                    {product?.category?.parent?.name?.length! > 16 &&
                    windowWidth > 1024
                      ? `${product?.category?.parent?.name?.slice(0, 16)}..`
                      : product?.category?.parent?.name}
                  </span>
                </Link>
              )}
              <span>
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L4.84375 5.53125L1.03125 9.34375"
                    stroke="#AAB4BD"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              {!!product?.category && (
                <Link
                  href={`/catalog?categories=${product?.category?.parent?.url}&page=1&subCategories=${product?.category?.url}`}
                  prefetch={false}
                >
                  <span title={product?.category?.name}>
                    {product?.category?.name?.length! > 16 && windowWidth > 1024
                      ? `${product?.category?.name?.slice(0, 16)}..`
                      : product?.category?.name}
                  </span>
                </Link>
              )}
              {!!product?.tags![0] &&
              product?.tags![0].url !== 'main_page' &&
              product?.tags![0].url !== 'best_product' &&
              product?.tags![0].url !== '-' ? (
                <>
                  <span>
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L4.84375 5.53125L1.03125 9.34375"
                        stroke="#AAB4BD"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <Link
                    href={`/catalog?categories=${product?.category?.parent?.url}&page=1&subCategories=${product?.category?.url}&tags=${product.tags[0].url}`}
                    prefetch={false}
                  >
                    <span title={product?.tags[0].name}>
                      {product?.tags[0]?.name?.length! > 16 &&
                      windowWidth > 1024
                        ? `${product?.tags[0]?.name?.slice(0, 16)}..`
                        : product?.tags[0]?.name}
                    </span>
                  </Link>
                </>
              ) : (
                ''
              )}
            </div>
            <ShareToSocial
              title={product?.name}
              productId={product?.id}
              artical={variant?.artical ?? product?.productVariants![0].artical}
            />
          </div>
          <div className={styles.ContentCotainer}>
            <div className={styles.Grid}>
              <Images
                product={product}
                images={images}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                paginateImage={paginateImage}
                direction={direction}
                page={page}
                setPage={setPage}
                base64Image={base64Image}
              />
              <Details
                product={product}
                selectedIndex={selectedIndex}
                paginateImage={paginateImage}
                reviewRef={reviewRef}
                questionRef={questionRef}
                setSelectedIndex={setSelectedIndex}
              />
            </div>
          </div>
          <DropDowns parameterProducts={product?.parameterProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
