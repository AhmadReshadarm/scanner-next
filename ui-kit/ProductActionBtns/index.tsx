import { motion } from 'framer-motion';
import { Product, ProductVariant } from 'swagger/services';
import { checkIfItemInCart, checkIfItemInWishlist } from './helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TWishlistState } from 'redux/types';
import {
  handleCartBtnClick,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';
import { useState } from 'react';
import styles from './ProductActionBtns.module.css';
import dynamic from 'next/dynamic';
const ItemCounter = dynamic(() => import('ui-kit/ItemCounter'));

type PropsCart = {
  product: Product;
  qty: number;
  variant: ProductVariant | undefined;
};

export const AddToCart: React.FC<PropsCart> = ({ product, qty, variant }) => {
  const { cart, countLoading } = useAppSelector<TCartState>(
    (state) => state.cart,
  );

  const dispatch = useAppDispatch();

  // -------------------- UI Hooks ---------------------
  const [productId, setProductId] = useState('');

  // ------------------- end of UI Hooks --------------------

  return (
    <>
      {!checkIfItemInCart(product, cart!) ? (
        <motion.button
          onClick={() => {
            handleCartBtnClick(product, dispatch, variant!, cart!)();
            setProductId('');
            setProductId(product.id!);
            setTimeout(() => setProductId(''), 1200);
          }}
          disabled={countLoading ? true : false}
          title={`Добавить ${product.name} в корзину`}
          type="button"
          className={styles.CartButtonWrapper}
        >
          <motion.div
            initial={{ height: '0%', width: '0%' }}
            animate={{ height: '100%', width: '100%' }}
            transition={{ duration: 0.15 }}
            className={styles.content_wrapper}
          >
            {countLoading && productId === product.id ? (
              <div className={styles.Loader} />
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                В КОРЗИНУ
              </motion.span>
            )}
          </motion.div>
          <div className={styles.content_indecator}></div>
        </motion.button>
      ) : (
        <ItemCounter product={product} qty={qty} />
      )}
    </>
  );
};

type PropsWishlist = {
  product: Product;
};

export const AddToWishlist: React.FC<PropsWishlist> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { wishlist, loading }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  // -------------------- UI Hooks ---------------------

  const [productId, setProductId] = useState('');

  // ------------------- end of UI Hooks --------------------

  return (
    <button
      onClick={handleWishBtnClick(product, dispatch, wishlist!)}
      onMouseDown={() => {
        setProductId('');
        setProductId(product.id!);
        setTimeout(() => setProductId(''), 1000);
      }}
      disabled={loading ? true : false}
      title={
        checkIfItemInWishlist(product, wishlist!)
          ? `Удалить ${product.name} из избранного`
          : `Добавить ${product.name} в избранное`
      }
      type="button"
      className={styles.WishlistButtonWrapper}
    >
      <div
        className={styles.InWishlistButtonContent}
        style={{
          background: checkIfItemInWishlist(product, wishlist!)
            ? `linear-gradient(
      90deg,
      #cda172 -6.8%,
      #fef5ca 34.14%,
      #fff8d7 38.26%,
      #fdf3c8 66.52%,
      #cda172 107.04%
    )`
            : `linear-gradient(94deg, #f2d099 9.58%, #c6986a 106.37%)`,
          border: checkIfItemInWishlist(product, wishlist!)
            ? `1px solid #00000017`
            : `none`,
        }}
      >
        {loading && productId === product.id ? (
          <div className={styles.Loader} />
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="wishlist-text-wrapper"
            style={{
              fontSize: checkIfItemInWishlist(product, wishlist!)
                ? '0.7rem'
                : '',
            }}
          >
            {checkIfItemInWishlist(product, wishlist!)
              ? 'УЖЕ В ИЗБРАННОЕ'
              : 'В ИЗБРАННОЕ'}
          </motion.span>
        )}
        <div className={styles.content_indecator}></div>
      </div>
    </button>
  );
};
