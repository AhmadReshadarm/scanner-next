import { Rating } from '@mui/material';
import ActionBtns from './ActionBtns';
import ColorPicker from './ColorPicker';
import { Basket, Product, ProductVariant } from 'swagger/services';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import styles from '../../styles/detail.module.css';
type Props = {
  product?: Product;
  selectedIndex: number;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const Details: React.FC<Props> = ({
  product,
  selectedIndex,
  questionRef,
  reviewRef,
  setSelectedIndex,
  paginateImage,
}) => {
  const { variant } = useAppSelector<TCartState>((state) => state.cart);

  const cart: Basket = useAppSelector((state) => state.cart.cart);
  // const orderProduct = cart?.orderProducts?.find(
  //   (orderProduct) => orderProduct.product?.id === product?.id,
  // );

  const checkHasOldPrice = (productVariant: ProductVariant) => {
    if (productVariant?.oldPrice) return true;
    return false;
  };

  return (
    <div className={styles.DetailsContainer}>
      <div className={styles.UserSelectWrapper}>
        <div className={styles.product_title_wrapper}>
          <div className={styles.title_top_bar}></div>
          <h1 className={styles.product_header_1} itemProp="name">
            {product?.name}
          </h1>
        </div>

        <div className={styles.short_description_wrapper}>
          <p>
            <span itemProp="description">
              {product?.desc?.includes('|')
                ? product?.desc?.split('|')[0]?.length! > 150
                  ? product?.desc?.split('|')[0].slice(0, 150) + '...'
                  : product?.desc?.split('|')[0]
                : product?.desc?.length! > 150
                ? product?.desc?.slice(0, 150) + '...'
                : product?.desc?.slice(0, 150)}
            </span>
          </p>
        </div>
        <div className={styles.ConvoContainer}>
          <div className={styles.convo_contentWrapper}>
            <div className={styles.ConvoWrappers}>
              <Rating
                value={product?.rating?.avg}
                precision={0.5}
                size="medium"
                readOnly
              />
            </div>
            <div className={styles.ConvoWrappers}>
              <span
                className={styles.reviews_text_wrapper}
                onClick={() => {
                  reviewRef.current.click();
                  reviewRef.current.scrollIntoView();
                }}
              >
                <span>{product?.reviews?.length ?? 0}</span>
                <span>Отзыв(ов) об этом товаре</span>
              </span>
            </div>
            <div className={styles.ConvoWrappers}>
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 11C8.26522 11.002 8.52036 10.8985 8.7093 10.7124C8.89825 10.5263 9.00551 10.2727 9.0075 10.0075C9.00949 9.74228 8.90604 9.48714 8.71991 9.2982C8.53378 9.10925 8.28022 9.00199 8.015 9C8.13801 8.99509 8.25964 8.97218 8.376 8.932C8.78164 8.80869 9.16955 8.63322 9.53 8.41C10.147 8.026 11 7.26 11 6C11 5.20435 10.6839 4.44129 10.1213 3.87868C9.55871 3.31607 8.79565 3 8 3C7.20435 3 6.44129 3.31607 5.87868 3.87868C5.31607 4.44129 5 5.20435 5 6C5 6.26522 5.10536 6.51957 5.29289 6.70711C5.48043 6.89464 5.73478 7 6 7C6.26522 7 6.51957 6.89464 6.70711 6.70711C6.89464 6.51957 7 6.26522 7 6C7 5.73478 7.10536 5.48043 7.29289 5.29289C7.48043 5.10536 7.73478 5 8 5C8.26522 5 8.51957 5.10536 8.70711 5.29289C8.89464 5.48043 9 5.73478 9 6C9 6.24 8.853 6.475 8.47 6.715C8.24759 6.85161 8.00776 6.95757 7.757 7.03L7.753 7.031C7.51726 7.09001 7.31108 7.23284 7.17298 7.4328C7.03488 7.63277 6.97433 7.87617 7.00263 8.11753C7.03093 8.35889 7.14615 8.58168 7.32676 8.74428C7.50737 8.90687 7.741 8.99813 7.984 9.001C7.72427 9.01103 7.47866 9.12179 7.2992 9.30982C7.11974 9.49784 7.02054 9.74835 7.02262 10.0083C7.0247 10.2682 7.1279 10.5171 7.31034 10.7022C7.49279 10.8873 7.74015 10.9941 8 11V11Z"
                    fill="black"
                  />
                  <path
                    d="M0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0L11 0C12.3261 0 13.5979 0.526784 14.5355 1.46447C15.4732 2.40215 16 3.67392 16 5V9C15.9998 10.1085 15.6314 11.1856 14.9527 12.062C14.2739 12.9384 13.3232 13.5645 12.25 13.842C12.1218 13.8781 11.9877 13.8882 11.8556 13.8718C11.7235 13.8554 11.5959 13.8128 11.4805 13.7464C11.365 13.68 11.264 13.5913 11.1833 13.4854C11.1027 13.3794 11.0439 13.2584 11.0106 13.1295C10.9773 13.0006 10.9701 12.8663 10.9894 12.7346C11.0087 12.6028 11.0541 12.4762 11.123 12.3623C11.1919 12.2483 11.2828 12.1492 11.3905 12.0709C11.4981 11.9925 11.6204 11.9365 11.75 11.906C12.394 11.7394 12.9644 11.3635 13.3717 10.8376C13.7789 10.3116 13.9999 9.66522 14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V10C2 10.5304 2.21071 11.0391 2.58579 11.4142C2.96086 11.7893 3.46957 12 4 12C4.26522 12 4.51957 12.1054 4.70711 12.2929C4.89464 12.4804 5 12.7348 5 13V13.382L7.553 12.106C7.67088 12.0424 7.80032 12.0032 7.93365 11.9906C8.06698 11.978 8.20148 11.9923 8.32917 12.0327C8.45686 12.0731 8.57514 12.1387 8.67699 12.2257C8.77883 12.3126 8.86218 12.4192 8.92207 12.539C8.98196 12.6588 9.01718 12.7893 9.02564 12.923C9.0341 13.0567 9.01563 13.1906 8.97132 13.317C8.92702 13.4434 8.85777 13.5596 8.7677 13.6587C8.67764 13.7578 8.56858 13.8378 8.447 13.894L4.447 15.894C4.29458 15.9702 4.12522 16.0061 3.95501 15.9985C3.78479 15.9908 3.61935 15.9398 3.47439 15.8502C3.32944 15.7606 3.20977 15.6355 3.12674 15.4867C3.04372 15.3379 3.00009 15.1704 3 15V13.874C2.14138 13.6519 1.38084 13.151 0.83783 12.4498C0.294824 11.7486 0.000117948 10.8869 0 10L0 5Z"
                    fill="black"
                  />
                </svg>
              </span>

              <span
                onClick={() => {
                  questionRef.current.click();
                  questionRef.current.scrollIntoView();
                }}
              >
                <span>{product?.questions?.length} вопрос(ов) о товаре</span>
              </span>
            </div>
          </div>
          <div className={styles.PriceWrapper}>
            <div className={styles.PriceItem}>
              {checkHasOldPrice(variant! ?? product?.productVariants![0])
                ? `${
                    variant?.oldPrice ?? product?.productVariants![0]?.oldPrice
                  } ₽`
                : ''}
            </div>
            <div className={styles.PriceItem}>
              {variant?.price ?? product?.productVariants![0]?.price} ₽
            </div>
          </div>
        </div>

        <div className={styles.SizePickerWrapper}>
          <div className={styles.info_size_wrapper}>
            <span className={styles.title}>Выберите артикул:</span>
          </div>
          <ColorPicker
            variantColor={variant?.color ?? product?.productVariants![0]?.color}
            productVariants={product?.productVariants}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            paginateImage={paginateImage}
          />
        </div>
      </div>

      <ActionBtns cart={cart} product={product!} />
    </div>
  );
};

export default Details;
