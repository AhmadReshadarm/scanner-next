import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  handleMenuStateRedux,
  outsideClickListnerRedux,
} from 'components/store/storeLayout/helpers';
import { TGlobalUIState, TWishlistState } from 'redux/types';
import {
  changeWishlistDisplayState,
  changeWishlistState,
} from 'redux/slicers/store/globalUISlicer';
import Link from 'next/link';
import styles from '../../styles/headerWishList.module.css';
import dynamic from 'next/dynamic';
const HeaderProductItmes = dynamic(() => import('ui-kit/HeaderProductItems'), {
  ssr: false,
});

type Props = {
  wishlistButtonRef: HTMLDivElement | any;
};

const HeaderWishlist: React.FC<Props> = ({ wishlistButtonRef }) => {
  const dispatch = useAppDispatch();

  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  //  -------------------------- UI HOOKS ------------------------------
  const { isWishlistOpen, wishlistDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const [wishlistWrapperRef, setWishlistWrapperRef] = useState(null);
  const [listening, setListening] = useState(false);
  const wishlistWrapperNode = useCallback((node: any) => {
    setWishlistWrapperRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      wishlistWrapperRef,
      wishlistButtonRef,
      dispatch,
      changeWishlistState,
      changeWishlistDisplayState,
    ),
  );
  // ---------------------- end of UI hooks ---------------------

  return (
    <>
      <motion.div
        ref={wishlistWrapperNode}
        style={{ display: wishlistDisplay }}
        animate={isWishlistOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
        className={styles.PopupWrapper}
      >
        {isWishlistOpen && (
          <>
            <div className={styles.header_wishlist_form_background}></div>
            <div className={styles.header_spacer}></div>
            {wishlist?.products?.length! <= 0 ? (
              <div className={styles.empty_wrapper}>
                <h1>{`Список ИЗБРАННОЕ пуст`.toLocaleUpperCase()}</h1>
              </div>
            ) : (
              <div className={styles.PopupDivider}>
                <ul className={styles.PopupContent}>
                  {wishlist?.products?.map((product, index: any) => {
                    return (
                      <HeaderProductItmes
                        key={`cart-item-${index}`}
                        product={product}
                        dataType="wishlist"
                        handleMenuState={handleMenuStateRedux(
                          dispatch,
                          changeWishlistState,
                          changeWishlistDisplayState,
                          isWishlistOpen,
                          wishlistDisplay,
                        )}
                      />
                    );
                  })}
                </ul>
                <div className={styles.PopupBtnsDivider}>
                  <Link href="/wishlist" prefetch={false}>
                    <button
                      onClick={handleMenuStateRedux(
                        dispatch,
                        changeWishlistState,
                        changeWishlistDisplayState,
                        isWishlistOpen,
                        wishlistDisplay,
                      )}
                      className={styles.ActionBtns}
                    >
                      {`ИЗБРАННОЕ`.toLocaleUpperCase()}
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </>
  );
};

export default HeaderWishlist;
