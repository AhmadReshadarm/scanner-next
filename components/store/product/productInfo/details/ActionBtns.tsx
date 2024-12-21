import { Basket, Product } from 'swagger/services';
import React from 'react';
import Link from 'next/link';
import { useAppSelector } from 'redux/hooks';
import { TCartState } from 'redux/types';
import { clearVariant } from 'redux/slicers/store/cartSlicer';
import { AddToCart, AddToWishlist } from 'ui-kit/ProductActionBtns';
import { findCartQTY } from 'ui-kit/HeaderProductItems/helpers';
import { checkIfItemInCart } from 'ui-kit/ProductActionBtns/helpers';
import styles from '../../styles/detail.module.css';
type Props = {
  cart: Basket;
  product: Product;
};

const ActionBtns: React.FC<Props> = ({ cart, product }) => {
  const { variant } = useAppSelector<TCartState>((state) => state.cart);

  const handleGoToCart = () => {
    clearVariant();
  };

  return (
    <div className={styles.ActionBtnContainer}>
      <div className={styles.ActionBtnsWrapper}>
        <AddToWishlist product={product!} />
        <AddToCart
          product={product!}
          qty={findCartQTY(product, cart!)}
          variant={variant ?? product?.productVariants![0]}
        />
      </div>
      {checkIfItemInCart(product, cart!) && (
        <div className={styles.CounterAndGotoCartWrapper}>
          <Link href="/cart" prefetch={false}>
            <div className={styles.AddtoCartWrapper}>
              <button
                onClick={handleGoToCart}
                className={styles.in_cart}
                type="button"
                title="ПЕРЕЙТИ В КОРЗИНУ"
              >
                <span>ПЕРЕЙТИ В КОРЗИНУ</span>
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ActionBtns;
