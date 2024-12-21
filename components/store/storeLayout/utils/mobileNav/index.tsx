import Link from 'next/link';
import {
  BasketSVG,
  WishlistSVG,
  HomePageIconSVG,
} from '../../utils/headerIcons/SVGIconsHeader';
import { TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { TWishlistState } from 'redux/types';
import { useRouter } from 'next/router';
import styles from '../../styles/mobileNav.module.css';

const NavMobile = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { wishlist }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );
  const router = useRouter();

  return (
    <div className={styles.NavWrap}>
      <Link aria-label="главная страница" href="/" prefetch={false}>
        <span className={styles.icons_wrapper_mobile}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.6384 11.8128L13.2884 1.4682L12.5946 0.774454C12.4366 0.617427 12.2228 0.529297 12 0.529297C11.7772 0.529297 11.5634 0.617427 11.4053 0.774454L0.361593 11.8128C0.199622 11.9742 0.0716145 12.1663 -0.0148749 12.378C-0.101364 12.5896 -0.144583 12.8164 -0.141979 13.045C-0.131265 13.9878 0.653557 14.7405 1.59641 14.7405H2.73481V23.4646H21.2652V14.7405H22.4277C22.8857 14.7405 23.3169 14.5611 23.6411 14.237C23.8006 14.0779 23.9271 13.8887 24.0131 13.6804C24.0991 13.4722 24.1429 13.2489 24.1419 13.0236C24.1419 12.5682 23.9625 12.137 23.6384 11.8128ZM13.5 21.5361H10.5V16.0718H13.5V21.5361ZM19.3366 12.812V21.5361H15.2143V15.4289C15.2143 14.837 14.7348 14.3575 14.1428 14.3575H9.85713C9.26516 14.3575 8.7857 14.837 8.7857 15.4289V21.5361H4.66338V12.812H2.09195L12.0027 2.90928L12.6214 3.52802L21.9107 12.812H19.3366Z"
              fill={router.pathname == '/' ? '#000000' : '#545454'}
            />
          </svg>
          <span
            style={{ color: router.pathname == '/' ? '#000000' : '#545454' }}
          >
            Главная
          </span>
        </span>
      </Link>
      <Link aria-label="каталог" href="/catalog" prefetch={false}>
        <span className={styles.icons_wrapper_mobile}>
          <svg
            width="31"
            height="32"
            viewBox="0 0 31 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 7.24999C0 6.55875 0.59404 6 1.32598 6L22.0441 6.00011C22.7761 6.00011 23.3701 6.55886 23.3701 7.25011C23.3701 7.94135 22.7761 8.5001 22.0441 8.5001L1.32598 8.49999C0.59404 8.49999 0 7.94124 0 7.24999ZM28.674 14.7501L1.32598 14.7499C0.59404 14.7499 0 15.3087 0 15.9999C0 16.6912 0.59404 17.2499 1.32598 17.2499L28.674 17.25C29.406 17.25 30 16.6913 30 16.0001C30 15.3088 29.406 14.7501 28.674 14.7501ZM16.7402 23.5L1.32598 23.4999C0.59404 23.4999 0 24.0586 0 24.7499C0 25.4411 0.59404 25.9999 1.32598 25.9999L16.7402 26C17.4721 26 18.0662 25.4413 18.0662 24.75C18.0662 24.0588 17.4721 23.5 16.7402 23.5Z"
              fill={router.pathname == '/catalog' ? '#000000' : '#545454'}
            />
          </svg>
          <span
            style={{
              color: router.pathname == '/catalog' ? '#000000' : '#545454',
            }}
          >
            Каталог
          </span>
        </span>
      </Link>

      <div className={styles.ParentWrapper}>
        {!!cart?.orderProducts?.length && (
          <span className={styles.Counter}>{cart?.orderProducts?.length}</span>
        )}
        <Link aria-label="корзина" href="/cart" prefetch={false}>
          <span className={styles.icons_wrapper_mobile}>
            <BasketSVG
              fill={router.pathname == '/cart' ? '#000000' : '#545454'}
            />
            <span
              style={{
                color: router.pathname == '/cart' ? '#000000' : '#545454',
              }}
            >
              Корзина
            </span>
          </span>
        </Link>
      </div>
      <div className={styles.ParentWrapper}>
        {!!wishlist?.items?.length && (
          <span className={styles.Counter}>{wishlist?.items?.length}</span>
        )}
        <Link aria-label="избранное" href="/wishlist" prefetch={false}>
          <span className={styles.icons_wrapper_mobile}>
            <WishlistSVG
              fill={router.pathname == '/wishlist' ? '#000000' : '#545454'}
            />
            <span
              style={{
                color: router.pathname == '/wishlist' ? '#000000' : '#545454',
              }}
            >
              Избранное
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavMobile;
