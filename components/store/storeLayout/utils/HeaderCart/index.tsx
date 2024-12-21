import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  handleMenuStateRedux,
  outsideClickListnerRedux,
} from 'components/store/storeLayout/helpers';
import { TCartState, TGlobalUIState } from 'redux/types';
import { getTotalPrice } from 'components/store/cart/helpers';
import { TAuthState } from 'redux/types';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
import {
  changeBasketState,
  changeCartDisplayState,
} from 'redux/slicers/store/globalUISlicer';
import styles from '../../styles/headerWishList.module.css';
import dynamic from 'next/dynamic';
const HeaderProductItmes = dynamic(() => import('ui-kit/HeaderProductItems'), {
  ssr: false,
});
type Props = {
  cartButtonRef: HTMLDivElement | any;
};

const HeaderCart: React.FC<Props> = ({ cartButtonRef }) => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const handleGoToCart = () => {
    dispatch(setOneClickBy(false));
  };

  //  -------------------------- UI HOOKS ------------------------------
  const { isBasketOpen, cartDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const [cartWrapperRef, setCartWrapperRef] = useState(null);
  const [listening, setListening] = useState(false);
  const cartWrapperNode = useCallback((node: any) => {
    setCartWrapperRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      cartWrapperRef,
      cartButtonRef,
      dispatch,
      changeBasketState,
      changeCartDisplayState,
    ),
  );
  // ---------------------- end of UI hooks ---------------------
  return (
    <motion.div
      ref={cartWrapperNode}
      style={{ display: cartDisplay }}
      animate={isBasketOpen ? 'open' : 'close'}
      variants={variants.fadeInReveal}
      className={styles.PopupWrapper}
    >
      {isBasketOpen && (
        <>
          <div className={styles.header_wishlist_form_background}></div>
          <div className={styles.header_spacer}></div>
          {!cart?.orderProducts?.length ? (
            <div className={styles.empty_wrapper}>
              <h1>{`Корзина пуста`.toLocaleUpperCase()}</h1>
            </div>
          ) : (
            <div className={styles.PopupDivider}>
              <ul className={styles.PopupContent}>
                {cart?.orderProducts?.map((orderProduct, index: any) => {
                  return (
                    <HeaderProductItmes
                      key={`cart-item-${index}`}
                      orderProduct={orderProduct}
                      dataType="cart"
                      handleMenuState={handleMenuStateRedux(
                        dispatch,
                        changeBasketState,
                        changeCartDisplayState,
                        isBasketOpen,
                        cartDisplay,
                      )}
                    />
                  );
                })}
              </ul>

              <div className={styles.PopupBtnsDivider}>
                <Link href="/cart" prefetch={false}>
                  <button
                    onClick={handleMenuStateRedux(
                      dispatch,
                      changeBasketState,
                      changeCartDisplayState,
                      isBasketOpen,
                      cartDisplay,
                    )}
                    className={styles.ActionBtns}
                  >
                    {`корзина`.toLocaleUpperCase()}
                  </button>
                </Link>
                <Link href="/checkout" prefetch={false}>
                  <button
                    onClick={() => {
                      handleGoToCart();
                      handleMenuStateRedux(
                        dispatch,
                        changeBasketState,
                        changeCartDisplayState,
                        isBasketOpen,
                        cartDisplay,
                      )();
                    }}
                    className={styles.ActionBtns}
                  >
                    {`Оформить заказ`.toLocaleUpperCase()}
                  </button>
                </Link>
                <div className={styles.TotalPriceWrapper}>
                  <h1>ОБЩИЙ СЧЕТ</h1>
                  <h1
                    className={styles.total_price_wrapper}
                    style={{
                      fontSize:
                        getTotalPrice(cart.orderProducts, user!)! > 100000
                          ? '1rem'
                          : '1.8rem',
                    }}
                  >
                    {getTotalPrice(cart.orderProducts, user!)}₽
                  </h1>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default HeaderCart;
