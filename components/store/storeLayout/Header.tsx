import Link from 'next/link';
import { handleMenuStateRedux, overrideDefaultIOSZoom } from './helpers';
import color from '../lib/ui.colors';
import {
  MenueNormalStateSVG,
  LogoSVG,
  SearchSVG,
  WishlistSVG,
  BasketSVG,
  ProfileSVG,
  MenuActiveStateSVG,
} from './utils/headerIcons/SVGIconsHeader';
import { PopupDisplay } from './constants';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { useRouter } from 'next/router';
import {
  TWishlistState,
  TAuthState,
  TGlobalUIState,
  TCartState,
} from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import {
  changeCatelogState,
  changeCatelogDisplayState,
  changeSearchFormState,
  changeSearchDisplayState,
  changeAuthFormState,
  changeAuthFormDisplayState,
  changeBasketState,
  changeCartDisplayState,
  changeWishlistState,
  changeWishlistDisplayState,
} from 'redux/slicers/store/globalUISlicer';
import NavMobile from './utils/mobileNav';
import dynamic from 'next/dynamic';
import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';
import { axiosInstance } from 'common/axios.instance';
import { fetchWishlistProducts } from 'redux/slicers/store/wishlistSlicer';
import styles from './styles/header.module.css';

// const HeaderCatalog = dynamic(() => import('./utils/HeaderCatalog/index'), {
//   ssr: false,
// });
// const SearchBar = dynamic(() => import('./utils/SearchBar'), {
//   ssr: false,
// });
// const HeaderWishlist = dynamic(() => import('./utils/HeaderWishlist'), {
//   ssr: false,
// });
// const HeaderCart = dynamic(() => import('./utils/HeaderCart'), {
//   ssr: false,
// });
// const AuthorizationModel = dynamic(() => import('./utils/HeaderAuth/index'), {
//   ssr: false,
// });

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => overrideDefaultIOSZoom());
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { wishlist } = useAppSelector<TWishlistState>(
    (state) => state.wishlist,
  );

  // ---------------------- UI HOOKS ------------------------

  // ------------------- catelog hooks -------------------
  const [catelogButtonRef, setCatelogButtonRef] = useState(null);
  const catelogButtonNode = useCallback((node: any) => {
    setCatelogButtonRef(node);
  }, []);
  // --------------------------------------------------------

  // ------------------- search hooks ---------------------
  const [searchButtonRef, setSearchButtonRef] = useState(null);
  const searchButtonNode = useCallback((node) => {
    setSearchButtonRef(node);
  }, []);

  // ------------------ wishlist hooks ------------------------
  const [wishlistButtonRef, setWishlistButtonRef] = useState(null);
  const wishlistButtonNode = useCallback((node) => {
    setWishlistButtonRef(node);
  }, []);
  // ------------------- cart hooks ------------------------------
  const [cartButtonRef, setCartButtonRef] = useState(null);
  const cartButtonNode = useCallback((node) => {
    setCartButtonRef(node);
  }, []);

  // ------------------- authorization hooks ---------------------
  const [authButtonRef, setAuthButtonRef] = useState(null);
  const authButtonNode = useCallback((node) => {
    setAuthButtonRef(node);
  }, []);
  // ------------------ end of authorization hooks ------------------
  const {
    isCatalogOpen,
    isAuthFormOpen,
    isBasketOpen,
    isWishlistOpen,
    isSearchFormActive,
    // isDropDownOpen,
    catelogDisplay,
    searchDisplay,
    wishlistDisplay,
    cartDisplay,
    authDisplay,
  } = useAppSelector<TGlobalUIState>((state) => state.globalUI);

  const [windowWidth, setWindowWidth]: [any, any] = useState(null);

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

  // --------------------- end of UI hooks --------------------------

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const basketId = localStorage.getItem('basketId');
      const wishlistId = localStorage.getItem('wishlistId')!;

      const createWishlistId = async () => {
        try {
          const wishlist = await axiosInstance.post('/wishlists');
          localStorage.setItem('wishlistId', wishlist.data.id);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchDataCartProducts = async () => {
        if (!basketId) {
          await dispatch(createCart());
          const newCreatedCardId = localStorage.getItem('basketId');
          await dispatch(fetchCart(newCreatedCardId!));
        }
        if (basketId) {
          const cartResponse = await dispatch(fetchCart(basketId));
          // only for dev use 👇
          if (cartResponse.meta.requestStatus == 'rejected') {
            await dispatch(createCart());
            const newCreatedCardId = localStorage.getItem('basketId');
            await dispatch(fetchCart(newCreatedCardId!));
          }
        }
      };
      fetchDataCartProducts();

      const fetchDataWishlistProducts = async () => {
        if (!wishlistId) {
          await createWishlistId();
          const newCreatedWishlistId = localStorage.getItem('wishlistId');
          dispatch(fetchWishlistProducts(newCreatedWishlistId!));
        }
        if (wishlistId) {
          const wishlistResponse = await dispatch(
            fetchWishlistProducts(wishlistId),
          );
          // only for dev use 👇
          if (wishlistResponse.meta.requestStatus == 'rejected') {
            await createWishlistId();
            const newCreatedWishlistId = localStorage.getItem('wishlistId');
            dispatch(fetchWishlistProducts(newCreatedWishlistId!));
          }
        }
      };
      fetchDataWishlistProducts();
    }
  }, [isClient]);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          <div className={styles.Content}>
            {/* ---------------------- catelog ------------------------- */}
            <button
              ref={catelogButtonNode}
              onClick={handleMenuStateRedux(
                dispatch,
                changeCatelogState,
                changeCatelogDisplayState,
                isCatalogOpen,
                catelogDisplay,
              )}
              title="каталог"
              className={styles.MenuButtonWrapper}
            >
              {catelogDisplay == PopupDisplay.None ? (
                <MenueNormalStateSVG
                  fill={
                    isAuthFormOpen ||
                    isBasketOpen ||
                    isWishlistOpen ||
                    isSearchFormActive
                      ? color.inactiveIcons
                      : color.activeIcons
                  }
                  animate={true}
                />
              ) : (
                <MenuActiveStateSVG fill={color.activeIcons} animate={true} />
              )}
            </button>
            {/* ---------------------- end of catelog ------------------------- */}
            <div className={styles.LogoWrapper}>
              <Link
                href="/"
                prefetch={false}
                title="Перейти на главную страницу"
              >
                <LogoSVG />
              </Link>
            </div>
            <div className={styles.IconsWrapper}>
              {/* ---------------------- search ------------------------- */}
              <button
                ref={searchButtonNode}
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeSearchFormState,
                  changeSearchDisplayState,
                  isSearchFormActive,
                  searchDisplay,
                )}
                className={styles.icons_parent_wrapper}
                title="Поиск товаров"
              >
                <SearchSVG
                  fill={
                    isAuthFormOpen ||
                    isBasketOpen ||
                    isWishlistOpen ||
                    isCatalogOpen
                      ? color.inactiveIcons
                      : color.activeIcons
                  }
                />
              </button>
              {/* ---------------------- end of search ------------------------- */}
              {/* ---------------------- wishlist ------------------------- */}
              <button
                ref={wishlistButtonNode}
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeWishlistState,
                  changeWishlistDisplayState,
                  isWishlistOpen,
                  wishlistDisplay,
                )}
                className={styles.icons_parent_wrapper}
                title="избранное"
              >
                {!!wishlist?.items?.length && (
                  <div className={styles.Counter}>
                    {wishlist?.items?.length}
                  </div>
                )}
                <WishlistSVG
                  fill={
                    isAuthFormOpen ||
                    isSearchFormActive ||
                    isBasketOpen ||
                    isCatalogOpen
                      ? color.inactiveIcons
                      : color.activeIcons
                  }
                />
              </button>
              {/* ---------------------- end of wishlist ------------------------- */}
              {/* ---------------------- basket ------------------------- */}
              <button
                ref={cartButtonNode}
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeBasketState,
                  changeCartDisplayState,
                  isBasketOpen,
                  cartDisplay,
                )}
                className={styles.icons_parent_wrapper}
                title="корзина"
              >
                {!!cart?.orderProducts?.length && (
                  <div className={styles.Counter}>
                    {cart?.orderProducts?.length}
                  </div>
                )}
                <BasketSVG
                  fill={
                    isAuthFormOpen ||
                    isSearchFormActive ||
                    isWishlistOpen ||
                    isCatalogOpen
                      ? color.inactiveIcons
                      : color.activeIcons
                  }
                />
              </button>
              {/* ---------------------- end of basket ------------------------- */}
              {/* ---------------------- Authorization ------------------------- */}
              <div
                ref={authButtonNode}
                onClick={() => {
                  windowWidth < 1024
                    ? router.push('/profile')
                    : handleMenuStateRedux(
                        dispatch,
                        changeAuthFormState,
                        changeAuthFormDisplayState,
                        isAuthFormOpen,
                        authDisplay,
                      )();
                }}
                className={styles.profile_icon_wrapper}
              >
                <button
                  title="личный кабинет"
                  aria-label="личный кабинет"
                  style={{ display: user ? 'none' : 'flex' }}
                >
                  <ProfileSVG
                    fill={
                      isBasketOpen ||
                      isSearchFormActive ||
                      isWishlistOpen ||
                      isCatalogOpen
                        ? color.inactiveIcons
                        : color.activeIcons
                    }
                  />
                </button>
                <span className={styles.profile_tag_mobile}>Л.K.</span>

                <button
                  title="личный кабинет"
                  style={{ display: user ? 'flex' : 'none' }}
                >
                  <img
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    src={
                      user
                        ? user!.image
                          ? `/api/images/${user!.image}`
                          : `https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${user?.firstName}`
                        : ''
                    }
                    alt="личный кабинет"
                  />
                </button>
              </div>

              {/* ---------------------- end of Authorization ------------------------- */}
            </div>
          </div>

          {/* <HeaderCatalog catelogButtonRef={catelogButtonRef} />
          <SearchBar
            searchButtonRef={searchButtonRef}
            windowWidth={windowWidth}
          />
          <HeaderWishlist wishlistButtonRef={wishlistButtonRef} />
          <HeaderCart cartButtonRef={cartButtonRef} />
          <AuthorizationModel
            authButtonRef={authButtonRef}
            windowWidth={windowWidth}
          /> */}
        </div>
      </div>
      <NavMobile />
    </>
  );
};

export default Header;
